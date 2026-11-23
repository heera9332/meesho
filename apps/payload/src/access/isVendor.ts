import type { Access } from 'payload'
import { checkRole } from '@/access/utilities'

/**
 * Access checker that verifies if the user has the vendor role.
 */
export const isVendor: Access = ({ req }) => {
  if (req.user) {
    return checkRole(['vendor'], req.user)
  }
  return false
}
