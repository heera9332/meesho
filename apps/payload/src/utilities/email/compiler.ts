/**
 * Email template placeholder compiler.
 * Replaces {{ placeholder }} tags with values from data and global defaults.
 */

export interface EmailGlobals {
  companyName: string
  siteUrl: string
  supportEmail: string
  currentYear: string
  [key: string]: any
}

export function getDefaultGlobals(): EmailGlobals {
  return {
    companyName: process.env.COMPANY_NAME || 'Meesho Ecommerce',
    siteUrl: process.env.NEXT_PUBLIC_STOREFRONT_URL || 'http://localhost:3000',
    supportEmail:
      process.env.SMTP_FROM_ADDRESS ||
      process.env.MAIL_FROM_ADDRESS ||
      'heera.singh@zoro-dev.com',
    currentYear: String(new Date().getFullYear()),
  }
}

export function compilePlaceholders(
  template: string,
  variables: Record<string, any> = {},
): string {
  if (!template || typeof template !== 'string') return ''

  const merged: Record<string, any> = {
    ...getDefaultGlobals(),
    ...variables,
  }

  // Regex matches {{ placeholder }}, {{placeholder}}, case-sensitive key lookup first, then case-insensitive
  return template.replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (match, key) => {
    if (key in merged && merged[key] !== undefined && merged[key] !== null) {
      return String(merged[key])
    }

    // Try case-insensitive lookup
    const lowerKey = key.toLowerCase()
    const foundKey = Object.keys(merged).find((k) => k.toLowerCase() === lowerKey)
    if (foundKey && merged[foundKey] !== undefined && merged[foundKey] !== null) {
      return String(merged[foundKey])
    }

    return match
  })
}
