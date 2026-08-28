# Keyboard Shortcuts Dashboard

A Catppuccin Latte inspired shortcut reference for:

1. Karabiner-Elements
2. Hammerspoon
3. WezTerm
4. Neovim

## Structure

```text
.
├── index.html
└── README.md
```

A single self-contained HTML file — no build step, no JS, no fetch.

## Update shortcuts

Edit the markup directly in `index.html`; each app is a `<section>` with
one `<div class="category">` card per shortcut group.

Then commit and push.

## Run locally

```sh
open index.html
```

Or serve it if you prefer:

```sh
python3 -m http.server 8000
```

## Publish to GitHub Pages

1. Create a repository, for example `keymaps-dashboard`.
2. Put these files in the repository root.
3. Push to GitHub.
4. Open repository Settings → Pages.
5. Source: `Deploy from a branch`.
6. Branch: `main`, folder: `/root`.
7. Save.

Your site will be available at:

```text
https://<your-github-username>.github.io/keymaps-dashboard/
```
