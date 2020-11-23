const path = require('path')
const glob = require('glob')
const Hapi = require('@hapi/hapi')
const MongoClient = require('mongodb').MongoClient
const {
  PORT,
  MONGODBURI
} = process.env

// Repositories
const StockRepository = require('./repositories/StockRepository')
const AtendimentoRepository = require('./repositories/AtendimentoRepository')

// Services
const StockService = require('./services/StockService')

async function connectDB () {
  const client = await MongoClient.connect(MONGODBURI, {
    poolSize: 10,
    useNewUrlParser: true
  })
  return {
    client,
    db: client.db()
  }
}

function registerRoutes (server, depedencies) {
  const handlersPaths = glob.sync(path.join(__dirname, './handlers/*.handler.js'))

  for (const handlerPath of handlersPaths) {
    const handlerMethod = require(handlerPath)
    if (!handlerMethod.handler) continue
    // Inject depedencies
    server.route({
      ...handlerMethod,
      handler: (req, h) => {
        return handlerMethod.handler(req, h, depedencies)
      }
    })
  }
}

const init = async () => {
  const server = Hapi.server({
    port: PORT || 5000
  })

  const { db } = await connectDB()
  const stockRepository = new StockRepository(db)
  const atendimentoRepository = new AtendimentoRepository(db)

  const stockService = new StockService(
    stockRepository,
    atendimentoRepository
  )

  registerRoutes(server, {
    stockService
  })
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

module.exports = init
