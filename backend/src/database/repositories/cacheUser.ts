import { RedisCache } from '../../utils/redis/redisCache'
import { createRedisClient } from '../../utils/redis'

class CacheUser {
  static _userCache: RedisCache

  static async getUserCache(): Promise<RedisCache> {
    if (this._userCache) {
      return this._userCache
    }
    return new RedisCache(`user`, await createRedisClient(true))
  }
}

export default CacheUser
