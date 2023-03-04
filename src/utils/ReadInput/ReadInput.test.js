import { ReadInput } from './ReadInput'

test('getFileName method test', () => {
    const fileName = 'input.json'
    process.argv = [
        '/Users/computer/.nvm/versions/node/v14.20.0/bin/node',
        '/Users/computer/Projects/personal/cash_in_out/app.js',
        fileName,
    ]

    const value = ReadInput.getFileName()
    expect(value).toBe(fileName)
})
