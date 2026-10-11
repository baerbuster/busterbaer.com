# busterbaer.com

Personal website for Buster Baer, built with React + Vite.

## Development

```sh
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Deployment

Pushes to `main` build and deploy to GitHub Pages via `.github/workflows/deploy.yml`.

The React Compiler is enabled through `@rolldown/plugin-babel` in `vite.config.js`.
