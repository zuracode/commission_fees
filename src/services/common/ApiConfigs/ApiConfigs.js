class ApiConfigs {
    #config = new Map()

    async getConfig(url) {
        const config = this.#config.get(url)

        if (config) {
            return Promise.resolve(config)
        } else {
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const data = await response.json()
            this.#config.set(url, data)

            return data
        }
    }
}

export { ApiConfigs }
