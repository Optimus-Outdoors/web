# Optimus Outdoors — web

Live at <https://optimus-outdoors.github.io/web/>

## Changing the text on the site

Edit **`content.js`**. Every headline, price, spec, and FAQ answer on the site
lives in that one file, and the instructions are at the top of it. Save, commit,
push — the site rebuilds itself in under a minute.

You do not need to open `index.html` to change wording.

## Files

| File | What it is |
|---|---|
| `content.js` | All website text. **This is the one you edit.** |
| `index.html` | Layout and styling. Reads everything from `content.js`. |
| `test_page.js` | Safety check — run `node test_page.js` before pushing. |
| `scratch/` | Original Claude Design export. Ignored by git. |

## Before you push

```
node test_page.js
```

It prints `ok` if the site will render. If it fails, the last edit to
`content.js` broke something — most often a missing comma or quote.

To preview locally without pushing:

```
python -m http.server 8000     # then open http://localhost:8000
```
