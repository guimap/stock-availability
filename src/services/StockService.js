const moment = require('moment')
const StockNotFoundError = require('../structures/errors/StockNotFoundError')
const {TODAY} = process.env
class StockService {
    constructor (stockRepository, atendimentoRepository) {
      this.repository = stockRepository
      this.atendimentoRepository = atendimentoRepository
    }

    async getAverageOrders(uf, city) {
      const orderByMonth =  await this.atendimentoRepository.ordersByMonth(uf, city)
      if(!orderByMonth || orderByMonth.length === 0) return 0
      const lastIndex = orderByMonth.length - 1
      const firstOrder = orderByMonth[lastIndex]
      const dateFirstOder = moment(firstOrder.date)
      const qtyDays = moment(TODAY).diff(dateFirstOder, 'days')
      
      const sum = orderByMonth.reduce((ammount, orderMonth) => ammount += orderMonth.total, 0)
      
      return sum / qtyDays
    }

    getCriticalAlertStock(currentStock, averageOrderByDay) {
      const quantityDays = currentStock.quantity / averageOrderByDay
      if (quantityDays < 10 || quantityDays > 23) return { code: 'red' }
      if (quantityDays <= 13 || (quantityDays >= 19 && quantityDays <= 23)) return { code: 'yellow' }
      if (quantityDays <= 18) return { code: 'green' }
      return {code: 'NO_FOUND'}
    }

    async getStockAvailability(uf, city) {
      const currentStock = await this.repository.currentStock(uf, city)
      if (!currentStock) throw new StockNotFoundError(uf, city)
      const averageItensByDay = await this.getAverageOrders(uf, city)

      //  Pega o estoque atual
      return this.getCriticalAlertStock(currentStock, averageItensByDay)

    }

    async getAllStockAvailability() {
      const allStocks = await this.repository.allStocks()
      if (!allStocks || allStocks.length === 0) throw new StockNotFoundError()
      const pendingPromises = allStocks.map(stock => {
        return new Promise(async (resolve) => {
          const averageItensByDay = await this.getAverageOrders(stock.uf, stock.city)
          const alert = this.getCriticalAlertStock(stock, averageItensByDay)
          resolve({
            uf: stock.uf,
            city: stock.city,
            alert
          })
        })
      })
      return Promise.all(pendingPromises)
    }
}

module.exports = StockService