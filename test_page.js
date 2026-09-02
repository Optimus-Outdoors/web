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
  open: false,
  setAttribute(k, v) { this.attrs[k] = String(v); },
  addEventListener() {},
  showModal() { this.open = true; },
  close() { this.open = false; },
  closest: () => null,
  classList: { toggle: () => true, remove() {} },
});

// Same escaping the page applies, so expected values match rendered markup.
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

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

// --- Contact dialog ------------------------------------------------------
const M = CONTENT.contact.methods;
assert.strictEqual(count('contactMethods', 'div'), M.length, 'one row per method');
// Empty href renders as plain text, not a dead link.
assert.strictEqual(count('contactMethods', 'a'), M.filter(m => m.href).length);
for (const m of M) assert.ok(nodes.contactMethods.innerHTML.includes(esc(m.value)), 'shows ' + m.label);
// Only outbound http links get a new tab; mailto/tel must open in place.
assert.strictEqual((nodes.contactMethods.innerHTML.match(/target="_blank"/g) || []).length,
  M.filter(m => /^https?:/.test(m.href)).length, 'new tab only for web links');
assert.ok(/rel="noopener"/.test(nodes.contactMethods.innerHTML), 'new tabs are noopener');

// The dialog reflects whatever trim is selected when it is opened.
const dialog = nodes.contactDialog;
assert.strictEqual(dialog.open, false, 'starts closed');
const openContact = () => onClick({
  target: { closest: sel => (sel === '[data-open-contact]' ? {} : null) },
});
click('trim', CONTENT.trims.length - 1);
openContact();
assert.strictEqual(dialog.open, true, 'reserve opens it');
const sel = CONTENT.trims[CONTENT.trims.length - 1];
assert.ok(nodes.contactSelection.textContent.includes(sel.name), 'shows selected trim');
assert.ok(nodes.contactSelection.textContent.includes(sel.price), 'shows selected price');

// Close button and backdrop click both dismiss it.
onClick({ target: { closest: s => (s === '#contactClose' ? {} : null) } });
assert.strictEqual(dialog.open, false, 'close button dismisses');
openContact();
onClick({ target: dialog });
assert.strictEqual(dialog.open, false, 'backdrop click dismisses');

// --- No stale branding left anywhere ------------------------------------
const all = html + fs.readFileSync(__dirname + '/content.js', 'utf8');
assert.ok(!/ridgeline/i.test(all), 'no Ridgeline left');
assert.ok(!/\bR2\b/.test(all), 'no R2 left');

console.log(`ok — ${boundPaths.length} bindings, ${CONTENT.trims.length} trims, ${CONTENT.specs.rows.length} specs`);
