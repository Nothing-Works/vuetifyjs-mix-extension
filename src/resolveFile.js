const fs = require('fs')
const getPath = require('./getPath')

function resolveFile(file) {
    const filePath = getPath(file)

    const defaultPath = getPath('resources/sass/variables.scss')

    if (fs.existsSync(filePath)) return filePath

    if (fs.existsSync(defaultPath)) return defaultPath

    return null
}

module.exports = resolveFile
