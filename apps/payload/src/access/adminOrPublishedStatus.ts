import type { Access, Where } from 'payload'
import { checkRole } from '@/access/utilities'

export const adminOrPublishedStatus: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  // Vendors can read published products, plus their own store's products
  if (user && checkRole(['vendor'], user)) {
    const vendorWhere: Where = {
      or: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          'vendor.owner': {
            equals: user.id,
          },
        },
      ],
    }
    return vendorWhere
  }

  const defaultWhere: Where = {
    _status: {
      equals: 'published',
    },
  }
  return defaultWhere
}
