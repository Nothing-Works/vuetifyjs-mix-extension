const mix = require('laravel-mix')
const getPath = require('./src/getPath')
const resolveOptions = require('./src/resolveOptions')

class Vuetify {
    constructor() {
        this.vuetifyPath = getPath('node_modules/vuetify')
    }

    withVuetifyLoader() {
        return this.vuetifyLoader === 'vuetify-loader'
    }

    withExtract() {
        return !!this.extract
    }

    register(loader, ...options) {
        this.vuetifyLoader = loader
        this.resolve(options)
    }

    resolve(options) {
        const resolved = resolveOptions(options)
        this.vuetifyLoaderOptions = resolved.vuetifyLoaderOptions
        this.sassArray = resolved.sassArray
        this.extract = resolved.extract
    }

    dependencies() {
        this.requiresReload = true

        const deps = ['vuetify', 'sass', 'sass-loader', 'fibers', 'deepmerge']

        if (this.withVuetifyLoader()) deps.push('vuetify-loader')

        if (this.withExtract()) deps.push('mini-css-extract-plugin')

        return deps
    }

    generateRules() {
        return this.sassArray.map((t) => ({
            test: t.sass,
            include: [this.vuetifyPath],
            use: [
                this.withExtract()
                    ? require('mini-css-extract-plugin').loader
                    : 'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        prependData: t.data,
                        implementation: require('sass'),
                        sassOptions: {
                            fiber: require('fibers'),
                            indentedSyntax: true
                        }
                    }
                }
            ]
        }))
    }

    webpackRules() {
        return this.generateRules()
    }

    webpackPlugins() {
        const plugins = []

        if (this.withVuetifyLoader()) {
            const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

            plugins.push(new VuetifyLoaderPlugin(this.vuetifyLoaderOptions))
        }

        if (this.withExtract()) {
            const MiniCssExtractPlugin = require('mini-css-extract-plugin')

            plugins.push(
                new MiniCssExtractPlugin({
                    filename: this.extract,
                    options: {
                        // eslint-disable-next-line no-undef
                        hmr: Mix.isUsing('hmr')
                    }
                })
            )
        }

        return plugins
    }

    excludeVuetifyPath(config) {
        for (const i of this.sassArray)
            config.module.rules
                .find((r) => String(r.test) === String(i.sass))
                .exclude.push(this.vuetifyPath)
    }

    webpackConfig(config) {
        this.excludeVuetifyPath(config)
    }
}

mix.extend('vuetify', new Vuetify())
