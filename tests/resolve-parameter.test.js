const rp = require('../src/resolveParameter')

describe('type check', () => {
    test('should be type object', () => {
        expect(typeof rp([])).toBe('object')
    })
    test('should be type object', () => {
        expect(typeof rp([1])).toBe('object')
    })
})

describe('has object option check', () => {
    test('should return same object for optionObject', () => {
        const pa = rp([{}])
        expect(pa.option).toEqual({})
    })
})

describe('has file string check', () => {
    test('should return path for fileString', () => {
        const pa = rp(['src/sass/variable.scss'])
        expect(pa.file).toBe('src/sass/variable.scss')
    })
})

describe('pass two params check order one', () => {
    const pa = rp(['src/sass/variable.scss', { foo: 'bar' }])
    test('should return same file', () => {
        expect(pa.file).toBe('src/sass/variable.scss')
    })
    test('should return same object', () => {
        expect(pa.option).toEqual({ foo: 'bar' })
    })
})

describe('pass two params check order two', () => {
    const pa = rp([{ foo: 'bar' }, 'src/sass/variable.scss'])
    test('should return same file', () => {
        expect(pa.file).toBe('src/sass/variable.scss')
    })
    test('should return same object', () => {
        expect(pa.option).toEqual({ foo: 'bar' })
    })
})
