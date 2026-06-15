# Keyboard Shortcuts Dashboard

A Catppuccin Latte inspired shortcut dashboard for:

1. Karabiner-Elements
2. Hammerspoon
3. WezTerm
4. Neovim

## Structure

```text
.
├── index.html
├── assets
│   ├── app.js
│   ├── shortcuts.json
│   └── style.css
└── README.md
```

## Update shortcuts

Edit:

```text
assets/shortcuts.json
```

Then commit and push.

## Run locally

Because the page uses `fetch()` to load JSON, use a small local server:

```sh
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
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
