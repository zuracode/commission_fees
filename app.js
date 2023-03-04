import './src/configs/fetch-polyfill.js'
import './src/configs/moment-configs.js'

import { FeesCounter } from './src/services/FeesCounter/FeesCounter.js'
;(async () => {
    try {
        FeesCounter.execute()
    } catch (error) {
        console.log(error)
    }
})()
