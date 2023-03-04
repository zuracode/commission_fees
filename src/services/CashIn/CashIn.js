import { ApiConfigs } from '../common/ApiConfigs/ApiConfigs.js'
import { ExtendedMath } from '../../utils/ExtendedMath/ExtendedMath.js'
import { CASH_IN_API_URL } from '../../configs/constant.js'

class CashIn extends ApiConfigs {
    constructor() {
        super()
    }

    async proceed(cashInData) {
        const config = await this.getConfig(CASH_IN_API_URL)

        if (cashInData.operation.amount <= config.max.amount) {
            return (0).toFixed(2)
        }

        return ExtendedMath.setValue(cashInData.operation.amount)
            .percent(config.percents)
            .roundUp()
            .getValue()
            .toFixed(2)
    }
}

export { CashIn }
