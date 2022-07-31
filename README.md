# Nuxt Module

## Development

- `yarn install`
- Update the following:
    1. `package.json`: change `@enab/module-starter` to `@enab/your-module-name`.
    2. `src/module.ts`: change `module-starter` and `moduleStarter`.
    3. `components/AppName`: change directory name `AppName` to your module name.
- `yarn dev:prepare`
- `yarn dev`

* Your playground inside `playground` folder.

## Pulling updates
- `git remote add template https://github.com/EnabApp/module-starter.git`
- `git fetch --all`
- `git merge template/master --allow-unrelated-histories`
- Fix conflicts.
