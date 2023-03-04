import { readFile } from 'fs/promises'

import { ReadInput } from '../../utils/ReadInput/ReadInput.js'
import { CashIn } from '../CashIn/CashIn.js'
import { CashOut } from '../CashOut/CashOut.js'

class FeesCounter {
    static #filterByCurrency(data, currency) {
        if (data?.length) {
            return data.filter((dataItem) => dataItem?.operation?.currency === currency)
        }
        return data
    }

    static #sortByDate(data) {
        if (data?.length) {
            return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        }
        return data
    }

    static async execute() {
        const fileName = ReadInput.getFileName()

        const response = await readFile(fileName)
        const jsonData = JSON.parse(response)?.input ?? []

        const filteredByCurrencyData = this.#filterByCurrency(jsonData, 'EUR')
        const sortedByDate = this.#sortByDate(filteredByCurrencyData)

        if (sortedByDate?.length) {
            const CashInInstance = new CashIn()
            const CashOutInstance = new CashOut()

            for await (const data of sortedByDate) {
                if (data.type === 'cash_out') {
                    const cashOut = await CashOutInstance.proceed(data)
                    console.log(cashOut)
                } else if (data.type === 'cash_in') {
                    const cashIn = await CashInInstance.proceed(data)
                    console.log(cashIn)
                }
            }
        }
    }
}

export { FeesCounter }
