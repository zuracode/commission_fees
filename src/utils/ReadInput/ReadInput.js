class ReadInput {
    static getFileName() {
        if (process.argv.length === 3) {
            let fileName = process.argv[2]

            if (!fileName) {
                console.log('Can not proceed further action without file name!')
                process.exit(1)
            }

            if (fileName.split('.')?.[1] !== 'json') {
                console.log('File name should be .json!')
                process.exit(1)
            }

            return fileName
        }

        console.log('Type file name!')
        process.exit(1)
    }
}

export { ReadInput }
