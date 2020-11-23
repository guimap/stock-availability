class AtendimentoRepository {
  constructor (db) {
    this.db = db
    this.collection = 'atendimento'
  }

  ordersByMonth (uf, city) {
    const query = [
      {
        $match: {
          uf,
          city
        }
      },
      {
        $group: {
          _id: '$date',
          total: { $sum: '$quantity' }

        }
      },
      {
        $project: {
          date: '$_id',
          total: '$total'
        }
      },
      {
        $sort: {
          date: -1
        }
      }
    ]

    return this.db.collection(this.collection).aggregate(query).toArray()
  }
}

module.exports = AtendimentoRepository
