// Smallest thing that fails if the trim/colorway wiring breaks.
// Run: node test_page.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];

// Minimal DOM: every id the script touches, plus querySelectorAll over the
// buttons its own template strings just wrote.
const nodes = {};
const node = () => ({
  innerHTML: '', textContent: '', dataset: {}, attrs: {},
  setAttribute(k, v) { this.attrs[k] = String(v); },
  addEventListener() {},
  classList: { toggle: () => true, remove() {} },
});
let onClick;
const document = {
  getElementById: id => (nodes[id] ||= node()),
  addEventListener(type, fn) { if (type === 'click') onClick = fn; },
  querySelectorAll(sel) {
    const key = sel === '[data-trim]' ? 'trimList' : 'cwList';
    const n = (nodes[key].innerHTML.match(/<button/g) || []).length;
    return Array.from({ length: n }, (_, i) => {
      const b = node();
      b.dataset = sel === '[data-trim]' ? { trim: String(i) } : { cw: String(i) };
      return b;
    });
  },
};

const ctx = vm.createContext({ document });
vm.runInContext(js, ctx);

// Default selection is Overland (index 1) on Lichen Green.
assert.strictEqual(nodes.stickyName.textContent, 'O1 Overland');
assert.strictEqual(nodes.stickyMeta.textContent, 'from $62,400 · Lichen Green');
assert.strictEqual(nodes.reserveBtn.textContent, 'Reserve Overland');
assert.strictEqual(nodes.cwName.textContent, 'Lichen Green');
assert.match(nodes.trimShot.textContent, /overland trim/);

// Every list rendered the right number of rows.
const count = (id, tag) => (nodes[id].innerHTML.match(new RegExp('<' + tag, 'g')) || []).length;
assert.strictEqual(count('trimList', 'button'), 3, 'three trims');
assert.strictEqual(count('cwList', 'button'), 4, 'four colorways');
assert.strictEqual(count('featureGrid', 'div'), 4 * 3, 'four feature cards');
assert.strictEqual(count('specTable', 'div'), 10, 'ten spec rows');
assert.strictEqual(count('trimIncludes', 'div'), 5, 'five includes for Overland');
assert.strictEqual(count('footerCols', 'div'), 3 * 3, 'three footer columns');
assert.strictEqual(count('footerCols', 'a'), 12, 'twelve footer links');

// Drive it the way the page does: through the delegated click handler.
const click = (attr, i) => onClick({
  target: { closest: sel => (sel === `[data-${attr}]` ? { dataset: { [attr]: String(i) } } : null) },
});

click('trim', 2);
click('cw', 2);
assert.strictEqual(nodes.stickyName.textContent, 'O1 Expedition');
assert.strictEqual(nodes.stickyMeta.textContent, 'from $79,800 · Basalt');
assert.strictEqual(count('trimIncludes', 'div'), 5);
assert.ok(nodes.trimIncludes.innerHTML.includes('R-14 walls'));

// Escaping holds on the one includes line that carries a quote.
click('trim', 0);
assert.strictEqual(nodes.stickyName.textContent, 'O1 Basecamp');
assert.ok(nodes.trimIncludes.innerHTML.includes('2&quot; foam core'), 'quotes escaped');

// The static markup kept the rename.
assert.ok(!/ridgeline/i.test(html), 'no Ridgeline left');
assert.strictEqual((html.match(/OPTIMUS OUTDOORS/g) || []).length, 2, 'header + footer wordmark');

console.log('ok');
