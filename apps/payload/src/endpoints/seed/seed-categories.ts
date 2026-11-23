import 'dotenv/config'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { seedCategories } from './categories'

async function run() {
  const payload = await getPayload({ config: configPromise })
  payload.logger.info('— Starting standalone Categories Seeder...')

  try {
    const result = await seedCategories({
      payload,
      clearExisting: false,
    })

    payload.logger.info(
      `🎉 Categories seeding finished successfully! Total categories: ${result.categories.length}`,
    )
    process.exit(0)
  } catch (error) {
    payload.logger.error({ err: error, message: 'Failed to seed categories' })
    process.exit(1)
  }
}

void run()
