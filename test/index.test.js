const catchFile = require('../index.js');

const arrayResult = [
    {
FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
]

describe('catchFile::', () => {
    it('must be a function', () => {
        expect(typeof catchFile).toBe('function');
    })
    it('must return array with results', async () => {
        const result = await catchFile('/home/murta/JSLibReadAndExtractMarkdown/test/files/text1short.md')
        expect(result).toEqual(arrayResult);
    })
    it('must return error "there are no links"', async () => {
        const result = await catchFile('/home/murta/JSLibReadAndExtractMarkdown/test/files/text1blank.md')
        expect(result).toBe('there are no links');
    })
    it('must return error concerning missing file', async () => {
        await expect(catchFile('/home/murta/JSLibReadAndExtractMarkdown/test/files'))
        .rejects.toThrow(/there is no file on the determined path/);
    })
    it('promise fulfilled', async () => {
        await expect(catchFile('/home/murta/JSLibReadAndExtractMarkdown/test/files/text1short.md'))
        .resolves.toEqual(arrayResult);
    })
    
})
