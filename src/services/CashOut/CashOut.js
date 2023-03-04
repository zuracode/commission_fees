import moment from 'moment'

import { ExtendedMath } from '../../utils/ExtendedMath/ExtendedMath.js'
import { ApiConfigs } from '../common/ApiConfigs/ApiConfigs.js'
import { CASH_OUT_NATURAL_API_URL, CASH_OUT_LEGAL_API_URL } from '../../configs/constant.js'

class CashOut extends ApiConfigs {
    constructor() {
        super()
        this.totalCashOutPerUserWeeklyList = new Map()
    }

    /**
     * check user history
     * if user has history and belongs to current week just sumUp additional cash out to existed one
     * if history does not belong to current week reset history
     * if user does not have history set it(open)
     */
    setTotalCashOutPerUserWeeklyList(cashOutData) {
        const cashOutByUser = this.totalCashOutPerUserWeeklyList.get(cashOutData.user_id)

        if (cashOutByUser) {
            const currentWeek = moment(cashOutData.date).week()

            if (currentWeek === cashOutByUser.week) {
                this.totalCashOutPerUserWeeklyList.set(cashOutData.user_id, {
                    ...cashOutByUser,
                    amount: cashOutByUser.amount + cashOutData.operation.amount,
                })
            } else {
                this.totalCashOutPerUserWeeklyList.set(cashOutData.user_id, {
                    amount: cashOutData.operation.amount,
                    week: moment(cashOutData.date).week(),
                })
            }
        } else {
            this.totalCashOutPerUserWeeklyList.set(cashOutData.user_id, {
                amount: cashOutData.operation.amount,
                week: moment(cashOutData.date).week(),
            })
        }
    }

    async proceed(cashOutData) {
        if (cashOutData.user_type === 'natural') {
            return this.naturalPersonProceed(cashOutData)
        } else {
            return this.legalPersonProceed(cashOutData)
        }
    }

    async naturalPersonProceed(cashOutData) {
        const config = await this.getConfig(CASH_OUT_NATURAL_API_URL)

        this.setTotalCashOutPerUserWeeklyList(cashOutData)

        const cashOutByUser = this.totalCashOutPerUserWeeklyList.get(cashOutData.user_id)

        if (cashOutByUser.amount > config.week_limit.amount) {
            if (cashOutByUser.amount - cashOutData.operation.amount > config.week_limit.amount) {
                return ExtendedMath.setValue(cashOutData.operation.amount)
                    .percent(config.percents)
                    .roundUp()
                    .getValue()
                    .toFixed(2)
            }

            return ExtendedMath.setValue(cashOutByUser.amount - config.week_limit.amount)
                .percent(config.percents)
                .roundUp()
                .getValue()
                .toFixed(2)
        }
        return (0).toFixed(2)
    }

    async legalPersonProceed(cashOutData) {
        const config = await this.getConfig(CASH_OUT_LEGAL_API_URL)

        if (cashOutData.operation.amount <= config.min.amount) {
            return (0).toFixed(2)
        }

        return ExtendedMath.setValue(cashOutData.operation.amount)
            .percent(config.percents)
            .roundUp()
            .getValue()
            .toFixed(2)
    }
}

export { CashOut }
