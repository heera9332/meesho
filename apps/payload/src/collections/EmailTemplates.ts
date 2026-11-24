import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const EmailTemplates: CollectionConfig = {
  slug: 'email-templates',
  labels: {
    singular: 'Email Template',
    plural: 'Email Templates',
  },
  access: {
    create: adminOnly,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Communications',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    description:
      'Manage multi-lingual email templates (English & Hindi) with dynamic {{placeholder}} variables.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Template Name',
      admin: {
        description: 'Human-readable name for this email template (e.g. Order Confirmation)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Template Slug / Identifier',
      admin: {
        description:
          'Unique programmatic key used when queueing emails (e.g. order-confirmation, forgot-password, order-access, welcome)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description / Purpose',
      admin: {
        description: 'Explains when and where this email is automatically triggered',
      },
    },
    {
      name: 'supportedPlaceholders',
      type: 'textarea',
      label: 'Supported Placeholders Reference',
      admin: {
        description:
          'List of variables available to insert into this template (e.g. {{customerName}}, {{orderId}}, {{orderUrl}}, {{orderTotal}})',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      localized: true,
      label: 'Email Subject Line',
      admin: {
        description:
          'Subject line of the email. Supports placeholder variables like {{orderId}}, {{companyName}}, etc.',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Email HTML Body',
      admin: {
        rows: 16,
        description:
          'Full HTML template body with inline CSS styling. Placeholders like {{customerName}} will be substituted at dispatch.',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active Template',
      admin: {
        position: 'sidebar',
        description: 'When disabled, emails attempting to use this template will be skipped.',
      },
    },
  ],
}
