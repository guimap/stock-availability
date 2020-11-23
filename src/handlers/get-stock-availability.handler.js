const Boom = require('boom')

module.exports = {
    handler: async (req, h, { stockService }) => {
        try {
            const {uf, city} = req.params
            const availability = await stockService.getStockAvailability(uf.toUpperCase(), city.toUpperCase())
            return availability
        } catch(err) {
            console.log(err)
            return Boom.boomify(err, { statusCode: err.statusCode || 500 })
        }
    },
    method: 'GET',
    path: '/stock/availability/{uf}/{city}'
}