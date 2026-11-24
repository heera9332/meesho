import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  IndentFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { Users } from '@/collections/Users'
import { Vendors } from '@/collections/Vendors'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { plugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const smtpHost = process.env.SMTP_HOST || process.env.MAIL_HOST
const smtpPort = Number(process.env.SMTP_PORT || process.env.MAIL_PORT || 465)
const smtpUser = process.env.SMTP_USER || process.env.MAIL_USERNAME
const smtpPass = process.env.SMTP_PASS || process.env.MAIL_PASSWORD
const smtpSecure =
  process.env.SMTP_SECURE === 'true' ||
  process.env.MAIL_ENCRYPTION === 'ssl' ||
  smtpPort === 465

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard#BeforeDashboard'],
    },
    user: Users.slug,
  },
  collections: [Users, Pages, Posts, Categories, Media, Vendors],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
        IndentFeature(),
        EXPERIMENTAL_TableFeature(),
      ]
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress:
      process.env.SMTP_FROM_ADDRESS ||
      process.env.MAIL_FROM_ADDRESS ||
      'noreply@meesho.com',
    defaultFromName:
      process.env.SMTP_FROM_NAME ||
      process.env.MAIL_FROM_NAME ||
      'Meesho Ecommerce',
    skipVerify: true,
    ...(smtpHost
      ? {
          transportOptions: {
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            ...(smtpUser && smtpPass
              ? {
                  auth: {
                    user: smtpUser,
                    pass: smtpPass,
                  },
                }
              : {}),
          },
        }
      : {}),
  }),
  endpoints: [
    {
      path: '/test-email',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Unauthorized: Admin authentication required to send test email' },
            { status: 401 }
          )
        }
        const url = new URL(req.url || '', 'http://localhost')
        const to = url.searchParams.get('to') || req.user.email
        try {
          await req.payload.sendEmail({
            to,
            subject: 'SMTP Verification - Meesho E-commerce',
            html: `
              <div style="font-family: Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #e11d48; margin-top: 0;">SMTP Verification Successful!</h2>
                <p>Hello,</p>
                <p>This confirmation email was successfully sent from your <strong>Meesho E-commerce</strong> Payload CMS via SMTP.</p>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 4px 0; font-size: 13px;"><strong>Host:</strong> ${smtpHost || 'Default'}</p>
                  <p style="margin: 4px 0; font-size: 13px;"><strong>Port:</strong> ${smtpPort}</p>
                  <p style="margin: 4px 0; font-size: 13px;"><strong>Secure (SSL):</strong> ${smtpSecure ? 'Yes' : 'No'}</p>
                  <p style="margin: 4px 0; font-size: 13px;"><strong>From:</strong> ${process.env.SMTP_FROM_ADDRESS || process.env.MAIL_FROM_ADDRESS || 'noreply@meesho.com'}</p>
                </div>
                <p style="color: #64748b; font-size: 12px; margin-bottom: 0;">Timestamp: ${new Date().toISOString()}</p>
              </div>
            `,
          })
          return Response.json({ success: true, message: `Test email dispatched to ${to}` })
        } catch (error: any) {
          return Response.json({ error: error.message || 'Failed to dispatch test email' }, { status: 500 })
        }
      },
    },
  ],
  globals: [Header, Footer],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'हिन्दी (Hindi)',
        code: 'hi',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  plugins,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // sharp,
})
