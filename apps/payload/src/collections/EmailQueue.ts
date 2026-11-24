import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const EmailQueue: CollectionConfig = {
  slug: 'email-queue',
  labels: {
    singular: 'Queued Email',
    plural: 'Email Queue & Logs',
  },
  access: {
    create: adminOnly,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'subject',
    group: 'Communications',
    defaultColumns: ['to', 'subject', 'status', 'locale', 'attempts', 'createdAt'],
    description:
      'Asynchronous background email queue and audit logs for fire-and-forget email dispatch.',
  },
  fields: [
    {
      name: 'to',
      type: 'text',
      required: true,
      label: 'Recipient Email Address',
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Subject Line',
    },
    {
      name: 'templateSlug',
      type: 'text',
      label: 'Template Identifier',
      admin: {
        description: 'Slug of the EmailTemplate used, if any',
      },
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English (en)', value: 'en' },
        { label: 'Hindi (hi)', value: 'hi' },
      ],
      label: 'Language / Locale',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Sent Successfully', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
      label: 'Dispatch Status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'attempts',
      type: 'number',
      defaultValue: 0,
      label: 'Delivery Attempts',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sentAt',
      type: 'date',
      label: 'Sent At',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lastError',
      type: 'textarea',
      label: 'Last Delivery Error',
      admin: {
        condition: (data) => data?.status === 'failed' || Boolean(data?.lastError),
      },
    },
    {
      name: 'variables',
      type: 'json',
      label: 'Template Placeholders / Context Data',
      admin: {
        description: 'JSON payload passed to the template at queue time',
      },
    },
    {
      name: 'renderedHtml',
      type: 'textarea',
      label: 'Rendered HTML (Audit Log)',
      admin: {
        rows: 8,
        description: 'Final compiled HTML body sent to the SMTP server',
      },
    },
  ],
}
