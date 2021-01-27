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

    withPostcss() {
        return !!this.postcss
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
        this.postcss = resolved.postcss
    }

    dependencies() {
        this.requiresReload = true

        const deps = ['vuetify', 'sass', 'sass-loader', 'deepmerge']

        if (this.withVuetifyLoader()) deps.push('vuetify-loader@next')

        if (this.withExtract()) deps.push('mini-css-extract-plugin')

        if (this.withPostcss()) deps.push('postcss-loader')

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
                ...this.addPostcssIfNeeded(),
                {
                    loader: 'sass-loader',
                    options: {
                        additionalData: t.data,
                        implementation: require('sass'),
                        sassOptions: {
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

    webpackConfig(config) {
        this.excludeVuetifyPath(config)

        if (this.withVuetifyLoader()) this.addVuetifyLoader(config)

        if (this.withExtract()) this.addExtract(config)
    }

    addPostcssIfNeeded() {
        return this.withPostcss() ? ['postcss-loader'] : []
    }

    addVuetifyLoader(config) {
        const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

        config.plugins.push(new VuetifyLoaderPlugin(this.vuetifyLoaderOptions))
    }

    addExtract(config) {
        const MiniCssExtractPlugin = require('mini-css-extract-plugin')

        config.plugins.push(
            new MiniCssExtractPlugin({ filename: this.extract })
        )
    }

    excludeVuetifyPath(config) {
        for (const i of this.sassArray)
            config.module.rules
                .find((r) => String(r.test) === String(i.sass))
                .exclude.push(this.vuetifyPath)
    }
}

mix.extend('vuetify', new Vuetify())
