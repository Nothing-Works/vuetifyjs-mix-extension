# Vuetify Laravel Mix Extension

## Usage

### If you are a Laravel user, here are some useful [instructions](https://github.com/Nothing-Works/vuetifyjs-mix-extension/blob/master/laravel.md).

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

## Progressive images

If you want to use [Progressive images feature](https://github.com/vuetifyjs/vuetify-loader#progressive-images), it is also easy to configure.

**NOTE:** You **_must_** have [ImageMagick](https://www.imagemagick.org/script/index.php), [GraphicsMagick](http://www.graphicsmagick.org/), or [sharp](https://github.com/lovell/sharp) installed for this to work.

All you need to do is to pass the `progressiveImages` options as the second argument when you enable `vuetify-loader`.

Here is an example:

```js
const options = { progressiveImages: true }
mix.js('resources/js/app.js', 'public/js').vuetify('vuetify-loader', options)
```

Of course you can pass more options to it, it works the same as the `vuetify-loader` [doc](https://github.com/vuetifyjs/vuetify-loader/blob/master/README.md#configuration).

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
