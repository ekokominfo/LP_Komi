# WordPress smoke test

Run from the repository root, with WordPress Playground CLI and Playwright installed:

```sh
npm run build:wordpress
npx @wp-playground/cli server --port 9400 --mount "$PWD/wordpress/komi-office:/wordpress/wp-content/themes/komi-office" --blueprint tests/wordpress/blueprint.json
# In another terminal:
mkdir -p artifacts
node tests/wordpress/smoke.cjs
node tests/wordpress/customizer.cjs
```

Set `PLAYWRIGHT_MODULE` to an installed Playwright module path and `CHROMIUM_PATH` to the Chromium executable when needed. The blueprint is for a disposable test site only; it creates sample posts and pages. It does not connect to the production database.

Verified on WordPress 7.1.4 / PHP 8.3 (Playground): theme activation; Customizer page selectors; automatic matching of existing page slugs; posts from the database; field-page content; WordPress search; original logo assets; WebGL; day/night; mobile menu and width; reduced fallback via `?no3d=1`; server-rendered content without JavaScript. This does not validate the user's hosting, existing plugin combinations, Elementor or Forminator versions, or real form submission.
