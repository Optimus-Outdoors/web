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

## Turning on the contact form

The Reserve popup shows the email and Instagram rows out of the box. To add a
real form that emails you, the site needs somewhere to send it — a static site
has no server of its own:

1. Sign up free at <https://formspree.io> (50 messages/month).
2. Create a form; it gives you a URL like `https://formspree.io/f/abcdwxyz`.
3. Paste it into `formEndpoint` in `content.js` and push.
4. Send a test message — Formspree asks you to confirm your address on the
   first one.

Leave `formEndpoint` empty and the form stays hidden, so nothing looks broken
before it is set up.

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
