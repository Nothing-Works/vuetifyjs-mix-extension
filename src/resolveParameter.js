function resolveParams(params) {
    let firstTwo = params.slice(0, 2)

    let fileString = null
    let optionObject = {}

    for (const i of firstTwo) {
        if (typeof i === 'string') {
            fileString = i
        }

        if (typeof i === 'object') {
            optionObject = i
        }
    }

    return {
        fileString,
        optionObject
    }
}

module.exports = resolveParams
