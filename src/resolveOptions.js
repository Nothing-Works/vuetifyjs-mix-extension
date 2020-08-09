const rp = require('./resolveParameter')
const rf = require('./resolveFile')

function resolveOptions(args) {
    const { file, option } = rp(args)

    const resolvedFile = rf(file)

    const sassArray = [
        {
            sass: /\.sass$/,
            data: resolvedFile ? `@import ${resolvedFile}` : undefined
        },
        {
            sass: /\.scss$/,
            data: resolvedFile ? `@import ${resolvedFile};` : undefined
        }
    ]

    const { postcss, extract, ...vuetifyLoaderOptions } = option

    return {
        vuetifyLoaderOptions,
        sassArray,
        extract,
        postcss
    }
}

module.exports = resolveOptions
