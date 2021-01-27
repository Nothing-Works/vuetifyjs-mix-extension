<p align="center">
<a href="https://www.npmjs.com/package/vuetifyjs-mix-extension"><img alt="npm" src="https://img.shields.io/npm/v/vuetifyjs-mix-extension"></a>
<a href="https://npmcharts.com/compare/vuetifyjs-mix-extension"><img alt="npm" src="https://img.shields.io/npm/dt/vuetifyjs-mix-extension"></a>
<a href="https://www.npmjs.com/package/vuetifyjs-mix-extension"><img alt="NPM" src="https://img.shields.io/npm/l/vuetifyjs-mix-extension"></a>
</p>

# Vuetify Laravel Mix Extension

## Usage

### If you are a Laravel user, here are some useful [instructions](https://github.com/Nothing-Works/vuetifyjs-mix-extension/blob/master/laravel.md).

**NOTE: This extension only supports `sass-loader` `^9.0.0` ATM.**

**Highly recommend updating you mix version to `^6.0.0`, as it provides much better experience and much faster.**

**The code snippets are for mix `^6.0.0`, if you are still not convinced and want to use mix version `^5.0.0` see [the old api here](https://github.com/Nothing-Works/vuetifyjs-mix-extension/blob/master/laravel.md)**

1. Install

```bash
npm i vuetifyjs-mix-extension@0.0.20 -D
```

2. Then require the extension in your Mix configuration:

```js
const mix = require('laravel-mix')

require('vuetifyjs-mix-extension')
```

3. Enable the extension by calling `vuetify()` in your Mix chain:

```js
mix.js('resources/js/app.js', 'public/js').vuetify().vue()
//if you use vuetify-loader
mix.js('resources/js/app.js', 'public/js').vuetify('vuetify-loader').vue()
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
mix.js('resources/js/app.js', 'public/js')
    .vuetify('vuetify-loader', 'src/path/to/variables.scss')
    .vue()
```

## Progressive images

If you want to use [Progressive images feature](https://github.com/vuetifyjs/vuetify-loader#progressive-images), it is also easy to configure.

**NOTE:** You **_must_** have [ImageMagick](https://www.imagemagick.org/script/index.php), [GraphicsMagick](http://www.graphicsmagick.org/), or [sharp](https://github.com/lovell/sharp) installed for this to work.

All you need to do is to pass the `progressiveImages` options in when you enable `vuetify-loader`.

Here is an example:

```js
const options = { progressiveImages: true }
mix.js('resources/js/app.js', 'public/js')
    .vuetify('vuetify-loader', options)
    .vue()
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
    .vue()
```

## Postcss support

```js
mix.js('resources/js/app.js', 'public/js').vuetify('', { postcss: true }).vue()
```

## known issue (for existing plugin users 26/01/2021)

If you are using mix `^6.0.0` you should face this error, `Error: Cannot find module 'webpack/lib/RuleSet'`

This is because the `vuetify-loader` current release is not supported webpack 5, the `@next` version has the webpack 5 support.

There are two ways you can solve this error (assuming you have the latest version of this plugin which is `0.0.20`):

    1. `npm uninstall vuetify-loader` and then run you compile scripts.

    2. Just simply update `vuetify-loader` to `@next` by running `npm i vuetify-loader@next -D`

If you use this plugin for the first time, you should not face this.

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
