import { EventEmitter } from 'events'
import { Mockgoose } from 'mockgoose'
import mongoose from '../src/services/mongoose'
import { mongo } from '../src/config'

EventEmitter.defaultMaxListeners = Infinity
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

global.Array = Array
global.Date = Date
global.Function = Function
global.Math = Math
global.Number = Number
global.Object = Object
global.RegExp = RegExp
global.String = String
global.Uint8Array = Uint8Array
global.WeakMap = WeakMap
global.Set = Set
global.Error = Error
global.TypeError = TypeError
global.parseInt = parseInt
global.parseFloat = parseFloat
beforeAll(async () => {
  await new Mockgoose(mongoose);
  mongoose.connect(mongo.uri)
})

afterAll(() => {
  mongoose.disconnect()
})

afterEach(async () => {
  const connection = mongoose.connection
  const promises = []
  Object.keys(connection.collections).forEach((collection) => {
    promises.push(connection.collections[collection].remove())
  })
  await Promise.all(promises)
})
