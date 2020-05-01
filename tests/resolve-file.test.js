const resolveFile = require('../src/resolveFile')
const getPath = require('../src/getPath')

describe('check file exist', () => {
    test('should exist', () => {
        expect(resolveFile('index.js')).toBe(getPath('index.js'))
    })
    test('should not exist', () => {
        expect(resolveFile('foo.js')).toBe(null)
    })
})
