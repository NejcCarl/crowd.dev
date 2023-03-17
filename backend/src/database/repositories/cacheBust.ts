import CacheTenant from './cacheTenant'
import CacheUser from './cacheUser'

export default class CacheBust {
  static async _bustCacheForTenant(id): Promise<void> {
    const tenantCache = await CacheTenant.getTenantCache()
    await tenantCache.delete(id)
  }

  static async bustCacheForTenantAndAssociatedUsers(tenant): Promise<void> {
    await this._bustCacheForTenant(tenant.id)
    if (tenant.users) {
      for (const user of tenant.users) {
        await this._bustCacheForUser(user.id)
      }
    }
  }

  static async bustCacheForUserAndAssociatedTenants(user): Promise<void> {
    await this._bustCacheForUser(user.id)
    if (user.tenants) {
      for (const tenant of user.tenants) {
        await this._bustCacheForTenant(tenant.id)
      }
    }
  }

  static async _bustCacheForUser(id): Promise<void> {
    const userCache = await CacheUser.getUserCache()
    await userCache.delete(id)
  }
}
