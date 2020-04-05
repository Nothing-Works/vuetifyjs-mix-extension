const mix = require('laravel-mix')
const path = require('path')

class Vuetify {
    constructor() {
        this.vuetifyPath = path.resolve(__dirname, 'node_modules/vuetify')
    }

    withVueLoader() {
        return this.vuetifyLoader === 'vuetify-loader'
    }

    register(loader) {
        this.vuetifyLoader = loader
    }

    dependencies() {
        this.requiresReload = true

        const deps = ['vuetify', 'sass', 'sass-loader', 'fibers', 'deepmerge']

        if (this.withVueLoader()) deps.push('vuetify-loader')

        return deps
    }

    webpackRules() {
        return {
            test: /\.s(c|a)ss$/,
            include: [this.vuetifyPath],
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        implementation: require('sass'),
                        sassOptions: {
                            fiber: require('fibers'),
                            indentedSyntax: true
                        }
                    }
                }
            ]
        }
    }

    webpackPlugins() {
        if (this.withVueLoader()) {
            const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

            return new VuetifyLoaderPlugin()
        }
    }

    excludeVuetifyPath(config, options) {
        for (const i of options)
            config.module.rules
                .find((r) => String(r.test) === String(i))
                .exclude.push(this.vuetifyPath)
    }

    webpackConfig(config) {
        this.excludeVuetifyPath(config, [/\.sass$/, /\.scss$/])
    }
}

mix.extend('vuetify', new Vuetify())
