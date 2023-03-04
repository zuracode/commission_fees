class ExtendedMath {
    static #value = 0

    static setValue(value) {
        this.#value = value

        return this
    }

    static getValue() {
        return this.#value
    }

    static roundUp(precision = 2) {
        if (precision < 0) {
            throw new RangeError('ExtendedMath.roundUp precision can not be less than 0')
        }

        const pow = Math.pow(10, precision)
        this.#value = Math.ceil(this.#value * pow) / pow

        return this
    }

    static percent(percent) {
        this.#value = (this.#value * percent) / 100

        return this
    }
}

export { ExtendedMath }
