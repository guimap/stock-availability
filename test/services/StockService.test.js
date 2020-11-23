const StockService = require('../../src/services/StockService')
const AtendimentoRepository = require('../../src/repositories/AtendimentoRepository')
const StockRepository = require('../../src/repositories/StockRepository')

const orderMock = require('../mock/order.mock')
const stockMock = require('../mock/stock.mock')

let stockRepository
let atendimentoRepository
let stockService

describe('StockService', () => {
    beforeEach( () => {
        stockRepository = new StockRepository()
        atendimentoRepository = new AtendimentoRepository()

        stockService = new StockService(
           stockRepository ,
           atendimentoRepository 
        )
    })
    describe('getAverageOrders', () => {
        test('should do a average by month according historic of orders', async () => {
            atendimentoRepository.ordersByMonth = jest.fn(() => Promise.resolve(orderMock))
            stockRepository.currentStock = jest.fn(() => Promise.resolve(stockMock))
            const average = await stockService.getAverageOrders('MG', 'JUIZ DE FORA')
            expect(parseInt(average)).toEqual(2)
        })
    })

    describe('getCriticalAlertStock', () => {

        test('should return critical alert red when have a stock greater than 90 itens by day  ', () => {
            const {code} = stockService.getCriticalAlertStock({quantity: 185}, 2)
            expect(code).toEqual('red')
        })
    
        test('should return critical alert red when have a stock less than 10 itens by day  ', () => {
            const {code} = stockService.getCriticalAlertStock({quantity: 15}, 2)
            expect(code).toEqual('red')
        })
    
        test('should return critical alert YELLOW when have a stock less than 13 itens by day  ', () => {
            const {code} = stockService.getCriticalAlertStock({quantity: 25}, 2)
            expect(code).toEqual('yellow')
        })
    
        test('should return critical alert YELLOW when have a stock less than 13 itens by day  ', () => {
            const {code} = stockService.getCriticalAlertStock({quantity: 44}, 2)
            expect(code).toEqual('yellow')
        })
    
        test('should return critical alert GREEN when have a stock with 14 itens by day  ', () => {
            const {code} = stockService.getCriticalAlertStock({quantity: 28}, 2)
            expect(code).toEqual('green')
        })
    
        test('should return critical alert GREEN when have a stock with 18 itens by day  ', () => {
            const {code} = stockService.getCriticalAlertStock({quantity: 36}, 2)
            expect(code).toEqual('green')
        })
    
        test('should return critical alert GREEN when have a stock with 17 itens by day  ', () => {
            const {code} = stockService.getCriticalAlertStock({quantity: 34}, 2)
            expect(code).toEqual('green')
        })
    })
})