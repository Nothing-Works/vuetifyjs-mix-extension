const path = require('path')
const fs = require('fs')

function resolveFile(file) {
    const rootPath = process.env.PWD
    const defaultPath = path.resolve(rootPath, 'resources/sass/variables.scss')

    if (fs.existsSync(defaultPath)) return defaultPath

    if (fs.existsSync(file)) return file

    return null
}

module.exports = resolveFile
