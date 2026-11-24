import type { Payload } from 'payload'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { compilePlaceholders } from './compiler'
import { DEFAULT_EMAIL_TEMPLATES } from './defaultTemplates'

export interface EnqueueEmailArgs {
  to: string
  templateSlug?: string
  data?: Record<string, any>
  locale?: 'en' | 'hi'
  subjectOverride?: string
  htmlOverride?: string
}

export interface EnqueueEmailResult {
  queued: boolean
  queueId?: string | number
  message?: string
}

/**
 * Fire-and-forget: Enqueues an email for asynchronous background dispatch.
 * Returns immediately without waiting for SMTP network transmission.
 */
export async function enqueueEmail(args: EnqueueEmailArgs): Promise<EnqueueEmailResult> {
  const { to, templateSlug, data = {}, locale = 'en', subjectOverride, htmlOverride } = args

  try {
    const payload = await getPayload({ config: configPromise })

    const initialSubject = subjectOverride || `Email Notification (${templateSlug || 'Direct'})`

    // Create queue record in database
    const record = await payload.create({
      collection: 'email-queue',
      data: {
        to,
        subject: initialSubject,
        templateSlug: templateSlug || undefined,
        locale,
        status: 'pending',
        attempts: 0,
        variables: data,
        renderedHtml: htmlOverride || undefined,
      },
    })

    const queueId = record.id

    // Fire and forget: schedule processing asynchronously
    if (typeof setImmediate === 'function') {
      setImmediate(() => {
        void processQueueItem(payload, queueId, args)
      })
    } else {
      setTimeout(() => {
        void processQueueItem(payload, queueId, args)
      }, 0)
    }

    return {
      queued: true,
      queueId,
      message: 'Email successfully placed on the asynchronous queue.',
    }
  } catch (error: any) {
    console.error('[enqueueEmail] Failed to record in email-queue collection:', error)

    // Fallback: fire background send directly if database queue record creation failed
    if (typeof setImmediate === 'function') {
      setImmediate(async () => {
        try {
          const payload = await getPayload({ config: configPromise })
          await processDirectFallback(payload, args)
        } catch (fallbackErr) {
          console.error('[enqueueEmail] Fallback direct dispatch failed:', fallbackErr)
        }
      })
    }

    return {
      queued: true,
      message: 'Email scheduled for background delivery.',
    }
  }
}

/**
 * Worker that processes a single queued item
 */
async function processQueueItem(
  payload: Payload,
  queueId: string | number,
  args: EnqueueEmailArgs,
  attemptNumber = 1,
): Promise<void> {
  const { to, templateSlug, data = {}, locale = 'en', subjectOverride, htmlOverride } = args

  try {
    await payload.update({
      collection: 'email-queue',
      id: queueId,
      data: {
        status: 'processing',
        attempts: attemptNumber,
      },
    })

    let subject = subjectOverride || ''
    let html = htmlOverride || ''

    if (templateSlug) {
      // Find template in requested locale
      const { docs: templates } = await payload.find({
        collection: 'email-templates',
        where: {
          slug: { equals: templateSlug },
        },
        locale,
        fallbackLocale: 'en',
        limit: 1,
      })

      const template = templates[0]

      if (!template) {
        throw new Error(`Email template with slug "${templateSlug}" not found in database.`)
      }

      if (template.active === false) {
        payload.logger.info(`[EmailQueue] Template "${templateSlug}" is inactive. Skipping email.`)
        await payload.update({
          collection: 'email-queue',
          id: queueId,
          data: {
            status: 'failed',
            lastError: `Template "${templateSlug}" is marked as inactive.`,
          },
        })
        return
      }

      if (!subject && template.subject) {
        subject = compilePlaceholders(template.subject, data)
      }

      if (!html && template.content) {
        html = compilePlaceholders(template.content, data)
      }
    }

    if (!subject) subject = 'Notification from Meesho E-commerce'
    if (!html) html = '<p>You have a new notification from Meesho E-commerce.</p>'

    // Dispatch email via Payload's configured SMTP adapter
    await payload.sendEmail({
      to,
      subject,
      html,
    })

    // Mark as sent
    await payload.update({
      collection: 'email-queue',
      id: queueId,
      data: {
        status: 'sent',
        subject,
        renderedHtml: html,
        sentAt: new Date().toISOString(),
      },
    })

    payload.logger.info(`[EmailQueue] Email successfully sent to ${to} (Subject: "${subject}")`)
  } catch (err: any) {
    const errorMsg = err?.message || String(err)
    payload.logger.error({
      msg: `[EmailQueue] Delivery attempt #${attemptNumber} failed for queue ID ${queueId}`,
      err,
    })

    const maxRetries = 3
    if (attemptNumber < maxRetries) {
      const retryDelay = attemptNumber * 2000 // exponential backoff: 2s, 4s...
      payload.logger.info(`[EmailQueue] Scheduling retry #${attemptNumber + 1} in ${retryDelay}ms...`)

      setTimeout(() => {
        void processQueueItem(payload, queueId, args, attemptNumber + 1)
      }, retryDelay)
    } else {
      await payload.update({
        collection: 'email-queue',
        id: queueId,
        data: {
          status: 'failed',
          lastError: errorMsg,
        },
      })
    }
  }
}

/**
 * Direct fallback worker if queue collection is inaccessible
 */
async function processDirectFallback(payload: Payload, args: EnqueueEmailArgs): Promise<void> {
  const { to, templateSlug, data = {}, locale = 'en', subjectOverride, htmlOverride } = args

  let subject = subjectOverride || 'Notification from Meesho E-commerce'
  let html = htmlOverride || '<p>You have a new notification.</p>'

  if (templateSlug) {
    const { docs: templates } = await payload.find({
      collection: 'email-templates',
      where: { slug: { equals: templateSlug } },
      locale,
      fallbackLocale: 'en',
      limit: 1,
    })
    const template = templates[0]
    if (template && template.active !== false) {
      if (template.subject) subject = compilePlaceholders(template.subject, data)
      if (template.content) html = compilePlaceholders(template.content, data)
    }
  }

  await payload.sendEmail({ to, subject, html })
}

/**
 * Auto-seeds default email templates if they do not yet exist in the database.
 * Supports both English and Hindi localized subjects and HTML contents.
 */
export async function seedEmailTemplates(payload: Payload): Promise<void> {
  try {
    for (const item of DEFAULT_EMAIL_TEMPLATES) {
      const { docs } = await payload.find({
        collection: 'email-templates',
        where: { slug: { equals: item.slug } },
        limit: 1,
      })

      if (docs.length === 0) {
        payload.logger.info(`[EmailTemplates] Auto-seeding default template "${item.name}"...`)

        // 1. Create base document in English (default locale)
        const doc = await payload.create({
          collection: 'email-templates',
          locale: 'en',
          data: {
            name: item.name,
            slug: item.slug,
            description: item.description,
            supportedPlaceholders: item.supportedPlaceholders,
            subject: item.subject.en,
            content: item.content.en,
            active: true,
          },
        })

        // 2. Add Hindi translation
        await payload.update({
          collection: 'email-templates',
          id: doc.id,
          locale: 'hi',
          data: {
            subject: item.subject.hi,
            content: item.content.hi,
          },
        })

        payload.logger.info(`[EmailTemplates] Template "${item.name}" created with EN and HI locales.`)
      }
    }
  } catch (error) {
    payload.logger.warn({
      msg: '[EmailTemplates] Error during template seeding (may be running in migration/build):',
      err: error,
    })
  }
}
