import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'domain', 'status', 'createdAt'],
    group: 'Admin',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Store / Tenant Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Store Identifier (Slug)',
      admin: {
        description: 'Unique URL slug for this vendor/store (e.g., nike, zara, vendor-one)',
      },
    },
    {
      name: 'domain',
      type: 'text',
      unique: true,
      index: true,
      label: 'Custom Domain / Subdomain',
      admin: {
        description: 'Optional custom domain or subdomain (e.g., vendor1.store.com)',
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
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Store Description',
    },
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
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'INR',
      options: [
        { label: 'INR (₹)', value: 'INR' },
        { label: 'USD ($)', value: 'USD' },
        { label: 'EUR (€)', value: 'EUR' },
      ],
    },
  ],
}
