const path = require('path')

function getPath(file) {
    if (file === null) return null

    const rootPath = process.env.PWD

    return path.resolve(rootPath, file)
}

module.exports = getPath
