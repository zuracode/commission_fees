import { ExtendedMath } from './ExtendedMath.js'

describe('ExtendedMath Util', () => {
    test('roundUp method test', () => {
        const number = 2.3
        const roundNumber = ExtendedMath.setValue(number).roundUp(2).getValue()

        expect(roundNumber).toBe(2.3)
    })

    test('percent method test', () => {
        const number = 100
        const getPercent = ExtendedMath.setValue(number).percent(25).getValue()

        expect(getPercent).toBe(25)
    })
})
