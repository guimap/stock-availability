const Boom = require('boom')

module.exports = {
  handler: async (req, h, { stockService }) => {
    try {
      const availability = await stockService.getAllStockAvailability()
      return availability
    } catch (err) {
      console.log(err)
      return Boom.boomify(err, { statusCode: err.statusCode || 500 })
    }
  },
  method: 'GET',
  path: '/stock/availability/all'
}
