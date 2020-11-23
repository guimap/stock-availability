class StockNotFoundError extends Error {
  constructor (uf, city) {
    super()
    this.name = 'StockNotFoundError'
    this.message = 'Cannot find a stock on this local'
    if (uf && city) this.message += ` on uf: ${uf} and city: ${city}`
    this.statusCode = 404
  }
}

module.exports = StockNotFoundError
