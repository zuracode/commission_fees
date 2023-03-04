import '../../configs/fetch-polyfill.js'
import { CashOut } from './CashOut'

const cashOutByNaturalPersonMock = [
    {
        data: {
            id: 1,
            date: '2016-01-04',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 200.0, currency: 'EUR' },
        },
        expected: 0,
    },
    {
        data: {
            id: 2,
            date: '2016-01-05',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 1000.0, currency: 'EUR' },
        },
        expected: 0.6,
    },
    {
        data: {
            id: 3,
            date: '2016-01-06',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 600.0, currency: 'EUR' },
        },
        expected: 1.8,
    },
    {
        data: {
            id: 4,
            date: '2016-01-08',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 2000.0, currency: 'EUR' },
        },
        expected: 6,
    },
    {
        data: {
            id: 5,
            date: '2016-01-15',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 2000.0, currency: 'EUR' },
        },
        expected: 3,
    },
]

const cashOutByLegalPersonMock = [
    {
        data: {
            id: 1,
            date: '2016-01-04',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 0.5, currency: 'EUR' },
        },
        expected: 0,
    },
    {
        data: {
            id: 1,
            date: '2016-01-04',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 2000.0, currency: 'EUR' },
        },
        expected: 6,
    },
    {
        data: {
            id: 1,
            date: '2016-01-23',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 200.0, currency: 'EUR' },
        },
        expected: 0.6,
    },
]

describe('CashOut Service', () => {
    const CashOutInstance = new CashOut()

    test.each(cashOutByNaturalPersonMock)(
        'cash out fee of natural person for $data.id: ',
        async ({ data, expected }) => {
            const fee = await CashOutInstance.naturalPersonProceed(data)
            expect(+fee).toBe(expected)
        }
    )

    test.each(cashOutByLegalPersonMock)(
        'cash out fee of legal person for $data.id: ',
        async ({ data, expected }) => {
            const fee = await CashOutInstance.legalPersonProceed(data)
            expect(+fee).toBe(expected)
        }
    )
})
