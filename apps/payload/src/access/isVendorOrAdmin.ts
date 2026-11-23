import type { Access } from 'payload'
import { checkRole } from '@/access/utilities'

/**
 * Access checker that verifies if the user has either admin or vendor role.
 */
export const isVendorOrAdmin: Access = ({ req }) => {
  if (req.user) {
    return checkRole(['admin', 'vendor'], req.user)
  }
  return false
}
