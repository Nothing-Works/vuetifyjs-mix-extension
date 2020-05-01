const rf = require('./resolveFile')
const rp = require('./resolveParameter')

function resolveOptions(args) {
    let { fileString, optionObject } = rp(args)

    let file = rf(fileString)

    const sassArray = [
        {
            sass: /\.sass$/,
            data: file ? `@import ${file}` : undefined
        },
        {
            sass: /\.scss$/,
            data: file ? `@import ${file};` : undefined
        }
    ]

    return {
        optionObject,
        sassArray
    }
}

module.exports = resolveOptions
