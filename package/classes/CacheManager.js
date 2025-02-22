const {CacheOptions} = require('../Utils/Constants.js')
const {Options} = require("discord.js")
const Cachers = require('../CacheHandler/index.js')
const AoiError = require('./AoiError.js')
class CacheManager {
constructor(client){
        client.cacheManager = this 
        Object.defineProperty(this,"client",{value: client})
this.caches= {
     cache:{},
     limitedCache:{},
     setCache:{}
    }
this.Group = Cachers.cache 
this.LimitGroup = Cachers.limitedCache 
this.SuperSet = Cachers.setCache 
    }
 get types(){
     return ["cache","limitedCache","setCache"]
 }
 _validType(type){
     return this.types.includes(type)
 }
createCache(type,name){
     if(!this._validType(type)) return AoiError.consoleError("CacheManagerError","Wrong Cache Type Provided") 
     this.caches[type][name] = new Cachers[type]()
 }
deleteCache(type,name){
    if(!this.validType(type)) return AoiError.consoleError("CacheManagerError","Wrong Cache Type Provided") 
    delete this.cache[type][name]
}
static _setDjsCacheManagers(cache){
    let managers = {} 
    for(const [key,value] of Object.entries(cache)){
        managers[CacheOptions[key]] = value 
    }
    return Options.cacheWithLimits(managers)
 }
}
module.exports = CacheManager