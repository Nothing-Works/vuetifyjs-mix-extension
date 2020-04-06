# Vuetify Laravel Mix Extension

## Usage

1. Install

```bash
npm i vuetifyjs-mix-extension -D
```

2. Then require the extension in your Mix configuration:

```js
const mix = require('laravel-mix')

require('vuetifyjs-mix-extension')
```

3. Enable the extension by calling `vuetify()` in your Mix chain:

```js
mix.js('resources/js/app.js', 'public/js').vuetify()
//if you use vuetify-loader
mix.js('resources/js/app.js', 'public/js').vuetify('vuetify-loader')
```

4. Run npm script

```bash
npm run dev
```
