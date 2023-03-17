import { RedisCache } from '../../utils/redis/redisCache'
import { createRedisClient } from '../../utils/redis'

class CacheTenant {
  static _tenantCache: RedisCache

  static async getTenantCache(): Promise<RedisCache> {
    if (this._tenantCache) {
      return this._tenantCache
    }
    return new RedisCache(`tenant`, await createRedisClient(true))
  }
}

export default CacheTenant
