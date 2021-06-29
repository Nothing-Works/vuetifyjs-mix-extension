const mix = require('laravel-mix')
const Chunks = require('laravel-mix/src/Chunks').Chunks;
const File = require('laravel-mix/src/File');
const getPath = require('./src/getPath')
const resolveOptions = require('./src/resolveOptions')
const path = require('path')

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

    updateChunks(config) {
        const chunks = Chunks.instance();
        const re = /(?<!node_modules)[\\/]node_modules[\\/](vuetify[\\/])/i;
        const groups = config.optimization.splitChunks.cacheGroups;
        Object.keys(groups).forEach((k) => {
            if (typeof groups[k] === 'object') {
                if (groups[k].type === 'css/mini-extract' && groups[k].chunks === 'all') {
                    const orig = groups[k].test;
                    groups[k].test = (module, context) => {
                        const name = module.nameForCondition();

                        return name && !re.test(name) && orig(module, context);
                    };
                }
            }
        })

        const output = new File(this.extract);

        chunks.add(
            'styles-vuetify',
            output.normalizedOutputPath(),
            [re, module => module.type === 'css/mini-extract'],
            {
                chunks: 'all',
                enforce: true,
                type: 'css/mini-extract'
            }
        );
    }

    addExtract(config) {
        const MiniCssExtractPlugin = require('mini-css-extract-plugin')
        const plugin = config.plugins.find((p) => p instanceof MiniCssExtractPlugin);
        if (!plugin) {
            config.plugins.push(
                new MiniCssExtractPlugin({
                    filename: '[name].css',
                    chunkFilename: '[name].css',
                    ignoreOrder: true,
                })
            )
        } else {
            plugin.options.ignoreOrder = true;
        }

        this.updateChunks(config);
    }

    excludeVuetifyPath(config) {
        for (const i of this.sassArray)
            config.module.rules
                .find((r) => String(r.test) === String(i.sass))
                .exclude.push(this.vuetifyPath)
    }
}

mix.extend('vuetify', new Vuetify())
