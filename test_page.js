// Smallest thing that fails if index.html and content.js drift apart.
// Run: node test_page.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const contentSrc = fs.readFileSync(__dirname + '/content.js', 'utf8');
const CONTENT = require('./content.js');

// The page's own render script (the second <script>, the one without a src).
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];

// Same escaping the page applies, so expected values match rendered markup.
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const boundPaths = [...html.matchAll(/data-c="([^"]+)"/g)].map(m => m[1]);

// Runs the page against a given content object and a given fetch stub.
function build(content, fetchImpl) {
  const nodes = {};
  const node = () => ({
    innerHTML: '', textContent: '', content: '', value: '', placeholder: '',
    hidden: true, disabled: false, action: '', method: '',
    dataset: {}, attrs: {}, open: false, handlers: {},
    setAttribute(k, v) { this.attrs[k] = String(v); },
    addEventListener(type, fn) { this.handlers[type] = fn; },
    querySelector: () => node(),
    showModal() { this.open = true; },
    close() { this.open = false; },
    reset() {},
    closest: () => null,
    classList: { toggle: () => true, remove() {} },
  });

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

  const warnings = [], errors = [];
  const console_ = { warn: (...a) => warnings.push(a.join(' ')), error: (...a) => errors.push(a.join(' ')), log() {} };
  class FormData { constructor(f) { this.form = f; } }

  vm.runInContext(js, vm.createContext({
    document, CONTENT: content, console: console_, FormData, fetch: fetchImpl,
    location: { search: '' },      // no ?debug panel during tests
    addEventListener() {}, window: {},
  }));

  const click = (attr, i) => onClick({
    target: { closest: sel => (sel === `[data-${attr}]` ? { dataset: { [attr]: String(i) } } : null) },
  });
  return { nodes, bound, document, warnings, errors, onClick, click };
}

const count = (nodes, id, tag) => (nodes[id].innerHTML.match(new RegExp('<' + tag, 'g')) || []).length;

// =======================================================================
// Default content — the form is OFF.
// =======================================================================
const app = build(CONTENT, () => { throw new Error('fetch must not be called'); });
const { nodes } = app;

// --- The binding contract between the two files -------------------------
assert.deepStrictEqual(app.warnings, [], 'every data-c path must exist in content.js');
assert.ok(boundPaths.length > 20, 'data-c bindings were found at all');
for (const n of app.bound) assert.notStrictEqual(n.textContent, '', 'filled: ' + n.dataset.c);
assert.strictEqual(app.document.title, CONTENT.site.tabTitle);

// --- Lists render one row per content entry -----------------------------
const c = (id, tag) => count(nodes, id, tag);
assert.strictEqual(c('trimList', 'button'), CONTENT.trims.length);
assert.strictEqual(c('cwList', 'button'), CONTENT.colorways.length);
assert.strictEqual(c('heroStats', 'div'), CONTENT.hero.stats.length * 3);
assert.strictEqual(c('featureGrid', 'h3'), CONTENT.features.items.length);
assert.strictEqual(c('interiorPoints', 'div'), CONTENT.interior.points.length * 3);
assert.strictEqual(c('specTable', 'div'), CONTENT.specs.rows.length);
assert.strictEqual(c('faqList', 'details'), CONTENT.faq.items.length);
assert.strictEqual(c('footerCols', 'a'), CONTENT.footer.columns.flatMap(x => x.links).length);
assert.strictEqual(c('navDesktop', 'a'), CONTENT.nav.length);
assert.strictEqual(c('navMobile', 'a'), CONTENT.nav.length);
assert.strictEqual((nodes.faqList.innerHTML.match(/ open/g) || []).length, 1, 'first FAQ open');

// --- Selection wiring, driven through the real click handler ------------
const first = CONTENT.trims[CONTENT.defaultTrim];
assert.strictEqual(nodes.stickyName.textContent, CONTENT.site.model + ' ' + first.name);
assert.strictEqual(nodes.trimPrice.textContent, first.price);
assert.strictEqual(nodes.cwName.textContent, CONTENT.colorways[0].name);

const last = CONTENT.trims.length - 1;
app.click('trim', last);
app.click('cw', CONTENT.colorways.length - 1);
const t = CONTENT.trims[last], cw = CONTENT.colorways[CONTENT.colorways.length - 1];
assert.strictEqual(nodes.stickyName.textContent, CONTENT.site.model + ' ' + t.name);
assert.strictEqual(nodes.stickyMeta.textContent, t.price + ' · ' + cw.name);
assert.strictEqual(nodes.reserveBtn.textContent, CONTENT.reservePrefix + t.name);
assert.strictEqual(c('trimIncludes', 'div'), t.includes.length);

// Whichever trim carries a double quote in its includes must render it escaped.
const quotedTrim = CONTENT.trims.findIndex(x => x.includes.some(l => l.includes('"')));
assert.notStrictEqual(quotedTrim, -1, 'a trim with a quoted spec exists to test escaping');
app.click('trim', quotedTrim);
const quotedLine = CONTENT.trims[quotedTrim].includes.find(l => l.includes('"'));
assert.ok(nodes.trimIncludes.innerHTML.includes(esc(quotedLine)), 'quotes escaped');
assert.ok(!nodes.trimIncludes.innerHTML.includes(quotedLine), 'raw quote not emitted');

// --- Contact dialog ------------------------------------------------------
const M = CONTENT.contact.methods;
assert.strictEqual(c('contactMethods', 'div'), M.length, 'one row per method');
assert.strictEqual(c('contactMethods', 'a'), M.filter(m => m.href).length, 'empty href is not a link');
for (const m of M) assert.ok(nodes.contactMethods.innerHTML.includes(esc(m.value)), 'shows ' + m.label);
assert.strictEqual((nodes.contactMethods.innerHTML.match(/target="_blank"/g) || []).length,
  M.filter(m => /^https?:/.test(m.href)).length, 'new tab only for web links');
assert.ok(/rel="noopener"/.test(nodes.contactMethods.innerHTML), 'new tabs are noopener');

const dialog = nodes.contactDialog;
assert.strictEqual(dialog.open, false, 'starts closed');
const openContact = a => a.onClick({ target: { closest: s => (s === '[data-open-contact]' ? {} : null) } });
app.click('trim', last);
openContact(app);
assert.strictEqual(dialog.open, true, 'reserve opens it');
assert.ok(nodes.contactSelection.textContent.includes(t.name), 'shows selected trim');
assert.ok(nodes.contactSelection.textContent.includes(t.price), 'shows selected price');
assert.strictEqual(nodes.formSelection.value, nodes.contactSelection.textContent, 'selection rides along');

app.onClick({ target: { closest: s => (s === '#contactClose' ? {} : null) } });
assert.strictEqual(dialog.open, false, 'close button dismisses');
openContact(app);
app.onClick({ target: dialog });
assert.strictEqual(dialog.open, false, 'backdrop click dismisses');

// --- Form OFF by default -------------------------------------------------
assert.strictEqual(CONTENT.contact.formEndpoint, '', 'ships with no endpoint');
assert.strictEqual(nodes.contactForm.hidden, true, 'form hidden with no endpoint');
assert.strictEqual(nodes.contactForm.handlers.submit, undefined, 'no submit wired');

// =======================================================================
// Endpoint pasted in — the form turns ON and actually submits.
// =======================================================================
const withForm = JSON.parse(JSON.stringify(CONTENT));
withForm.contact.formEndpoint = 'https://formspree.io/f/testtest';

async function main() {
const submitWith = async response => {
  const calls = [];
  const a = build(withForm, (url, opts) => { calls.push({ url, opts }); return Promise.resolve(response); });
  assert.strictEqual(a.nodes.contactForm.hidden, false, 'form visible once configured');
  assert.strictEqual(a.nodes.contactForm.action, withForm.contact.formEndpoint);
  assert.strictEqual(a.nodes.contactForm.method, 'POST');
  await a.nodes.contactForm.handlers.submit({ preventDefault() {} });
  return { a, calls };
};

// Success path.
const okRun = await submitWith({ ok: true, status: 200 });
assert.strictEqual(okRun.calls.length, 1, 'posted once');
assert.strictEqual(okRun.calls[0].url, withForm.contact.formEndpoint);
assert.strictEqual(okRun.calls[0].opts.method, 'POST');
assert.strictEqual(okRun.calls[0].opts.headers.Accept, 'application/json');
assert.strictEqual(okRun.a.nodes.formStatus.textContent, withForm.contact.form.successLabel);
assert.strictEqual(okRun.a.nodes.formStatus.dataset.state, 'success');
assert.strictEqual(okRun.a.nodes.formSubmit.disabled, false, 're-enabled after send');

// A rejected submission must say so, not silently claim success.
const badRun = await submitWith({ ok: false, status: 500 });
assert.strictEqual(badRun.a.nodes.formStatus.textContent, withForm.contact.form.errorLabel);
assert.strictEqual(badRun.a.nodes.formStatus.dataset.state, 'error');
assert.strictEqual(badRun.a.nodes.formSubmit.disabled, false, 're-enabled after failure');

// The honeypot and the hidden selection field must exist in the markup.
assert.ok(/name="_gotcha"/.test(html), 'spam honeypot present');
assert.ok(/name="selection"/.test(html), 'selection field present');
assert.ok(/required/.test(html), 'fields are required');

// --- No stale branding left anywhere ------------------------------------
const all = html + contentSrc;
assert.ok(!/ridgeline/i.test(all), 'no Ridgeline left');
assert.ok(!/\bR2\b/.test(all), 'no R2 left');

console.log(`ok — ${boundPaths.length} bindings, ${CONTENT.trims.length} trims, form off+on`);
}

main().catch(err => { console.error(err); process.exit(1); });
