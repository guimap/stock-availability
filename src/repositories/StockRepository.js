class StockRepository {
    constructor(db) {
      this.db = db
      this.collection = 'stock'
    }

    async currentStock(uf, city) {
      const query = {
        uf,
        city
      }
      const results = await this.db.collection(this.collection).find(query).toArray()
      return results[0]
    }

    allStocks() {
      return this.db.collection(this.collection).find({}).toArray()
    }
}

module.exports = StockRepository