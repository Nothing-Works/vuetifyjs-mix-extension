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

    register(loader, ...options) {
        this.vuetifyLoader = loader
        this.resolve(options)
    }

    resolve(options) {
        const resolved = resolveOptions(options)
        this.vuetifyLoaderOptions = resolved.option
        this.sassArray = resolved.sassArray
    }

    dependencies() {
        this.requiresReload = true

        const deps = ['vuetify', 'sass', 'sass-loader', 'fibers', 'deepmerge']

        if (this.withVuetifyLoader()) deps.push('vuetify-loader')

        return deps
    }

    generateRules() {
        return this.sassArray.map((t) => ({
            test: t.sass,
            include: [this.vuetifyPath],
            use: [
                'vue-style-loader',
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
        if (this.withVuetifyLoader()) {
            const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

            return new VuetifyLoaderPlugin(this.vuetifyLoaderOptions)
        }
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
