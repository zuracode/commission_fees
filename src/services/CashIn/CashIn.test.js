import '../../configs/fetch-polyfill.js'
import { CashIn } from './CashIn.js'

const cashInMock = [
    {
        data: {
            date: '2016-01-05',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_in',
            operation: { amount: 200.0, currency: 'EUR' },
        },
        expected: 0.06,
    },
    {
        data: {
            date: '2016-01-05',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_in',
            operation: { amount: 5.0, currency: 'EUR' },
        },
        expected: 0,
    },
]

describe('CashIn Service', () => {
    const CashInInstance = new CashIn()

    test.each(cashInMock)('cash in fee of person for $data.id:', async ({ data, expected }) => {
        const fee = await CashInInstance.proceed(data)
        expect(+fee).toBe(expected)
    })
})
