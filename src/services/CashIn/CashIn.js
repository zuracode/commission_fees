import { ApiConfigs } from '../common/ApiConfigs/ApiConfigs.js'
import { ExtendedMath } from '../../utils/ExtendedMath/ExtendedMath.js'
import { CASH_IN_API_URL } from '../../configs/constant.js'

class CashIn extends ApiConfigs {
    constructor() {
        super()
    }

    async proceed(cashInData) {
        const config = await this.getConfig(CASH_IN_API_URL)

        const operationFee = ExtendedMath.setValue(cashInData.operation.amount)
            .percent(config.percents)
            .getValue()

        if (operationFee >= config.max.amount) {
            return config.max.amount.toFixed(2)
        }

        return operationFee.toFixed(2)
    }
}

export { CashIn }
