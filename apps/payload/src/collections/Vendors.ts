import type { CollectionConfig, Where } from 'payload'
import { slugField } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isVendorOrAdmin } from '@/access/isVendorOrAdmin'
import { checkRole } from '@/access/utilities'

export const Vendors: CollectionConfig = {
  slug: 'vendors',
  admin: {
    useAsTitle: 'name',
    group: 'Marketplace',
    defaultColumns: ['name', 'slug', 'owner', 'status', 'isVerified', 'commissionRate'],
  },
  access: {
    create: isVendorOrAdmin,
    read: ({ req: { user } }) => {
      if (user && checkRole(['admin'], user)) {
        return true
      }
      if (user && checkRole(['vendor'], user)) {
        const vendorWhere: Where = {
          or: [
            {
              status: {
                equals: 'active',
              },
            },
            {
              owner: {
                equals: user.id,
              },
            },
          ],
        }
        return vendorWhere
      }
      const defaultWhere: Where = {
        status: {
          equals: 'active',
        },
      }
      return defaultWhere
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (checkRole(['admin'], user)) return true
      if (checkRole(['vendor'], user)) {
        const vendorWhere: Where = {
          owner: {
            equals: user.id,
          },
        }
        return vendorWhere
      }
      return false
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Store / Vendor Name',
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
      label: 'Vendor Owner Account',
      admin: {
        position: 'sidebar',
        description: 'The user account authorized to manage this store and its products.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Suspended', value: 'suspended' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
      label: 'Verified Vendor Badge',
      admin: {
        position: 'sidebar',
        description: 'Highlights this vendor with a verified trust badge on storefront product cards.',
      },
    },
    {
      name: 'commissionRate',
      type: 'number',
      defaultValue: 5,
      label: 'Platform Commission (%)',
      admin: {
        position: 'sidebar',
        description: 'Percentage fee retained by platform on each sale.',
      },
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 4.8,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'reviewsCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    slugField({
      position: 'sidebar',
    }),
    {
      name: 'description',
      type: 'textarea',
      label: 'Store Description / Bio',
      admin: {
        description: 'Public description displayed on the vendor profile and store page.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Store Logo / Avatar',
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      label: 'Store Header Banner',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'contactEmail',
          type: 'email',
          label: 'Store Contact Email',
        },
        {
          name: 'contactPhone',
          type: 'text',
          label: 'Store Contact Phone',
        },
      ],
    },
    {
      name: 'address',
      type: 'group',
      label: 'Store Address & Location',
      fields: [
        {
          name: 'street',
          type: 'text',
          label: 'Street Address',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'city',
              type: 'text',
            },
            {
              name: 'state',
              type: 'text',
            },
            {
              name: 'postalCode',
              type: 'text',
              label: 'Pincode / Postal Code',
            },
            {
              name: 'country',
              type: 'text',
              defaultValue: 'India',
            },
          ],
        },
      ],
    },
    {
      name: 'businessDetails',
      type: 'group',
      label: 'Legal & Tax Details',
      fields: [
        {
          name: 'legalBusinessName',
          type: 'text',
          label: 'Registered Business Name',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'gstin',
              type: 'text',
              label: 'GSTIN Number',
            },
            {
              name: 'pan',
              type: 'text',
              label: 'PAN Number',
            },
          ],
        },
      ],
    },
    {
      name: 'payoutDetails',
      type: 'group',
      label: 'Bank & Payout Information',
      fields: [
        {
          name: 'accountHolder',
          type: 'text',
          label: 'Bank Account Holder Name',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'bankName',
              type: 'text',
              label: 'Bank Name',
            },
            {
              name: 'accountNumber',
              type: 'text',
              label: 'Account Number',
            },
            {
              name: 'ifscCode',
              type: 'text',
              label: 'IFSC Code',
            },
          ],
        },
        {
          name: 'upiId',
          type: 'text',
          label: 'UPI ID / VPA (Optional)',
        },
      ],
    },
    {
      name: 'products',
      type: 'join',
      collection: 'products',
      on: 'vendor',
      admin: {
        allowCreate: false,
        defaultColumns: ['title', 'slug', 'priceInUSD', '_status'],
        description: 'Products created by and assigned to this vendor store.',
      },
    },
  ],
}
