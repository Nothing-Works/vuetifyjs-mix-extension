const path = require('path')

function getPath(file) {
    if (file === null) return null

    let rootPath = process.env.PWD

    if (typeof rootPath === 'undefined') rootPath = process.cwd()

    return path.resolve(rootPath, file)
}

module.exports = getPath
