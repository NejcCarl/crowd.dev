import cronGenerator from 'cron-time-generator'
import SequelizeRepository from '../../database/repositories/sequelizeRepository'
import Plans from '../../security/plans'
import { CrowdJob } from '../../types/jobTypes'
import { createServiceChildLogger } from '../../utils/logging'
import TenantRepository from '../../database/repositories/tenantRepository'

const log = createServiceChildLogger('downgradeExpiredPlansCronJob')

const job: CrowdJob = {
  name: 'Downgrade Expired Trial Plans',
  // every day
  cronTime: cronGenerator.every(1).days(),
  onTrigger: async () => {
    log.info('Downgrading expired trial plans.')
    const dbOptions = await SequelizeRepository.getDefaultIRepositoryOptions()

    const expiredTrialTenants = await dbOptions.database.sequelize.query(
      `select t.id, t.name from tenants t
      where t."isTrialPlan" and t."trialEndsAt" < now()`,
    )

    for (const tenant of expiredTrialTenants[0]) {
      await TenantRepository.update(
        tenant.id,
        { isTrialPlan: false, trialEndsAt: null, plan: Plans.values.essential },
        dbOptions,
      )
    }

    log.info('Downgrading expired non-trial plans')
    const expiredNonTrialTenants = await dbOptions.database.sequelize.query(
      `select t.id, t.name from tenants t
      where (t.plan = ${Plans.values.growth} or t.plan = ${Plans.values.eagleEye}) and t."planSubscriptionEndsAt" is not null and t."planSubscriptionEndsAt" + interval '3 days' < now()`,
    )

    for (const tenant of expiredNonTrialTenants[0]) {
      await TenantRepository.update(tenant.id, { plan: Plans.values.essential }, dbOptions)
    }
  },
}

export default job
