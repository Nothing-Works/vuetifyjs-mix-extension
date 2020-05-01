const resolveFile = require('../src/resolveFile')

describe('check file exist', () => {
    test('should exist', () => {
        expect(resolveFile('index.js')).toBe('index.js')
    })
    test('should not exist', () => {
        expect(resolveFile('foo.js')).toBe(null)
    })
})
