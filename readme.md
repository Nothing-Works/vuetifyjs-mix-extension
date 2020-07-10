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

## SASS variables

**NOTE:** This is only supported when using `tree-shaking`

By default it's going to look at your root directory `'resources/sass/variables.scss'` file. It's going to use that file, if it exists.

You can also give it a different path, for example:

```js
mix.js('resources/js/app.js', 'public/js').vuetify(
    'vuetify-loader',
    'src/path/to/variables.scss'
)
```

## Progressive images

If you want to use [Progressive images feature](https://github.com/vuetifyjs/vuetify-loader#progressive-images), it is also easy to configure.

**NOTE:** You **_must_** have [ImageMagick](https://www.imagemagick.org/script/index.php), [GraphicsMagick](http://www.graphicsmagick.org/), or [sharp](https://github.com/lovell/sharp) installed for this to work.

All you need to do is to pass the `progressiveImages` options in when you enable `vuetify-loader`.

Here is an example:

```js
const options = { progressiveImages: true }
mix.js('resources/js/app.js', 'public/js').vuetify('vuetify-loader', options)
```

Of course you can pass more options to it, it works the same as the `vuetify-loader` [doc](https://github.com/vuetifyjs/vuetify-loader/blob/master/README.md#configuration).

**Finally, if you use both `Progressive images` and `SASS variables`, just pass both arguments after `'vuetify-loader'`. The order of the arguments does not matter**

## Extract css
To extract all Vuetify components css, pass the `extract` option.

```js
mix.js('resources/js/app.js', 'public/js')
   .vuetify('vuetify-loader', {
        extract: 'css/vuetify-components.css'
   })
```

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
