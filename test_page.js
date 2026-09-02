// Smallest thing that fails if index.html and content.js drift apart.
// Run: node test_page.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const CONTENT = require('./content.js');

// The page's own render script (the second <script>, the one without a src).
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];

const nodes = {};
const node = () => ({
  innerHTML: '', textContent: '', content: '', dataset: {}, attrs: {},
  setAttribute(k, v) { this.attrs[k] = String(v); },
  addEventListener() {},
  classList: { toggle: () => true, remove() {} },
});

// One stub node per data-c attribute actually present in index.html.
const boundPaths = [...html.matchAll(/data-c="([^"]+)"/g)].map(m => m[1]);
const bound = boundPaths.map(p => Object.assign(node(), { dataset: { c: p } }));

let onClick;
const document = {
  title: '',
  getElementById: id => (nodes[id] ||= node()),
  querySelector: () => node(),
  addEventListener(type, fn) { if (type === 'click') onClick = fn; },
  querySelectorAll(sel) {
    if (sel === '[data-c]') return bound;
    const key = sel === '[data-trim]' ? 'trimList' : 'cwList';
    const n = (nodes[key].innerHTML.match(/<button/g) || []).length;
    return Array.from({ length: n }, (_, i) => {
      const b = node();
      b.dataset = sel === '[data-trim]' ? { trim: String(i) } : { cw: String(i) };
      return b;
    });
  },
};

// Any unresolved data-c path warns instead of throwing, so capture warnings.
const warnings = [];
const console_ = { warn: (...a) => warnings.push(a.join(' ')), log() {} };

vm.runInContext(js, vm.createContext({ document, CONTENT, console: console_ }));

// --- The binding contract between the two files -------------------------
assert.deepStrictEqual(warnings, [], 'every data-c path must exist in content.js');
assert.ok(boundPaths.length > 20, 'data-c bindings were found at all');
for (const n of bound) assert.notStrictEqual(n.textContent, '', 'filled: ' + n.dataset.c);
assert.strictEqual(document.title, CONTENT.site.tabTitle);

// --- Lists render one row per content entry -----------------------------
const count = (id, tag) => (nodes[id].innerHTML.match(new RegExp('<' + tag, 'g')) || []).length;
assert.strictEqual(count('trimList', 'button'), CONTENT.trims.length);
assert.strictEqual(count('cwList', 'button'), CONTENT.colorways.length);
assert.strictEqual(count('heroStats', 'div'), CONTENT.hero.stats.length * 3);
assert.strictEqual(count('featureGrid', 'h3'), CONTENT.features.items.length);
assert.strictEqual(count('interiorPoints', 'div'), CONTENT.interior.points.length * 3);
assert.strictEqual(count('specTable', 'div'), CONTENT.specs.rows.length);
assert.strictEqual(count('faqList', 'details'), CONTENT.faq.items.length);
assert.strictEqual(count('footerCols', 'a'), CONTENT.footer.columns.flatMap(c => c.links).length);
assert.strictEqual(count('navDesktop', 'a'), CONTENT.nav.length);
assert.strictEqual(count('navMobile', 'a'), CONTENT.nav.length);
assert.strictEqual((nodes.faqList.innerHTML.match(/ open/g) || []).length, 1, 'first FAQ open');

// --- Selection wiring, driven through the real click handler ------------
const first = CONTENT.trims[CONTENT.defaultTrim];
assert.strictEqual(nodes.stickyName.textContent, CONTENT.site.model + ' ' + first.name);
assert.strictEqual(nodes.trimPrice.textContent, first.price);
assert.strictEqual(nodes.cwName.textContent, CONTENT.colorways[0].name);

const click = (attr, i) => onClick({
  target: { closest: sel => (sel === `[data-${attr}]` ? { dataset: { [attr]: String(i) } } : null) },
});

const last = CONTENT.trims.length - 1;
click('trim', last);
click('cw', CONTENT.colorways.length - 1);
const t = CONTENT.trims[last], c = CONTENT.colorways[CONTENT.colorways.length - 1];
assert.strictEqual(nodes.stickyName.textContent, CONTENT.site.model + ' ' + t.name);
assert.strictEqual(nodes.stickyMeta.textContent, t.price + ' · ' + c.name);
assert.strictEqual(nodes.reserveBtn.textContent, CONTENT.reservePrefix + t.name);
assert.strictEqual(count('trimIncludes', 'div'), t.includes.length);

// Quotes inside content.js must survive into the markup escaped.
click('trim', 0);
assert.ok(nodes.trimIncludes.innerHTML.includes('2&quot; foam core'), 'quotes escaped');

// --- No stale branding left anywhere ------------------------------------
const all = html + fs.readFileSync(__dirname + '/content.js', 'utf8');
assert.ok(!/ridgeline/i.test(all), 'no Ridgeline left');
assert.ok(!/\bR2\b/.test(all), 'no R2 left');

console.log(`ok — ${boundPaths.length} bindings, ${CONTENT.trims.length} trims, ${CONTENT.specs.rows.length} specs`);
