function resolveParams(params) {
    const firstTwo = params.slice(0, 2)

    let file = null
    let option = {}

    for (const i of firstTwo) {
        if (typeof i === 'string') file = i

        if (typeof i === 'object') option = i
    }

    return {
        file,
        option
    }
}

module.exports = resolveParams
