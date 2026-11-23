import type { Endpoint } from 'payload'
import jwt from 'jsonwebtoken'
import { getServerSideURL } from '@/utilities/getURL'

interface OAuthProfile {
  provider: 'google' | 'github'
  providerAccountId: string
  email: string
  name?: string
  avatarUrl?: string
}

async function findOrCreateOAuthUser(payload: any, profile: OAuthProfile) {
  const { provider, providerAccountId, email, name, avatarUrl } = profile

  // 1. Search for user by providerAccountId in socialAccounts or direct socialLogins
  let existingUser = null

  try {
    const byProvider = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      where: {
        or: [
          {
            [`socialLogins.${provider}.id`]: {
              equals: providerAccountId,
            },
          },
          {
            'socialAccounts.providerAccountId': {
              equals: providerAccountId,
            },
          },
        ],
      },
    })

    if (byProvider.docs.length > 0) {
      existingUser = byProvider.docs[0]
    }
  } catch (err) {
    // Continue to fallback check by email
  }

  // 2. Fallback search by email
  if (!existingUser && email) {
    const byEmail = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      where: {
        email: {
          equals: email.toLowerCase(),
        },
      },
    })

    if (byEmail.docs.length > 0) {
      existingUser = byEmail.docs[0]
    }
  }

  const now = new Date().toISOString()

  // 3. Update existing user or create a new user
  if (existingUser) {
    const existingAccounts = existingUser.socialAccounts || []
    const hasAccount = existingAccounts.some(
      (acc: any) => acc.provider === provider && acc.providerAccountId === providerAccountId,
    )

    const updatedAccounts = hasAccount
      ? existingAccounts
      : [
          ...existingAccounts,
          {
            provider,
            providerAccountId,
            email,
            name: name || existingUser.name,
            avatarUrl: avatarUrl || existingUser.avatarUrl,
            linkedAt: now,
          },
        ]

    const updated = await payload.update({
      collection: 'users',
      id: existingUser.id,
      data: {
        avatarUrl: existingUser.avatarUrl || avatarUrl,
        socialLogins: {
          ...(existingUser.socialLogins || {}),
          [provider]: {
            id: providerAccountId,
            email,
            name: name || existingUser.name,
            ...(provider === 'google' ? { picture: avatarUrl } : { avatarUrl }),
            lastLogin: now,
          },
        },
        socialAccounts: updatedAccounts,
      },
    })

    return updated
  }

  // 4. Create new user
  const newUser = await payload.create({
    collection: 'users',
    data: {
      email: email.toLowerCase(),
      name: name || email.split('@')[0],
      password: crypto.randomUUID(), // Random secure password for OAuth accounts
      roles: ['customer'],
      avatarUrl,
      authProvider: provider,
      socialLogins: {
        [provider]: {
          id: providerAccountId,
          email,
          name: name || email.split('@')[0],
          ...(provider === 'google' ? { picture: avatarUrl } : { avatarUrl }),
          lastLogin: now,
        },
      },
      socialAccounts: [
        {
          provider,
          providerAccountId,
          email,
          name: name || email.split('@')[0],
          avatarUrl,
          linkedAt: now,
        },
      ],
    },
  })

  return newUser
}

function generateAuthToken(payload: any, user: any) {
  const token = jwt.sign(
    {
      id: user.id,
      collection: 'users',
      email: user.email,
    },
    payload.secret,
    {
      expiresIn: 1209600, // 14 days
    },
  )

  const cookiePrefix = payload.config.cookiePrefix || 'payload'
  const cookieName = `${cookiePrefix}-token`
  const isProd = process.env.NODE_ENV === 'production'
  const cookieHeader = `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=1209600${isProd ? '; Secure' : ''}`

  return { token, cookieHeader }
}

export const oauthEndpoints: Endpoint[] = [
  {
    path: '/oauth/providers',
    method: 'get',
    handler: async () => {
      return Response.json({
        google: Boolean(process.env.GOOGLE_CLIENT_ID),
        github: Boolean(process.env.GITHUB_CLIENT_ID),
      })
    },
  },
  {
    path: '/oauth/authorize',
    method: 'get',
    handler: async (req) => {
      const serverUrl = getServerSideURL()
      const url = new URL(req.url || '', serverUrl)
      const provider = url.searchParams.get('provider')
      const redirect = url.searchParams.get('redirect') || '/account'

      if (provider === 'google') {
        const clientId = process.env.GOOGLE_CLIENT_ID
        if (!clientId) {
          return Response.redirect(
            `${serverUrl}/login?error=${encodeURIComponent('Google OAuth is not configured. Missing GOOGLE_CLIENT_ID.')}`,
            302,
          )
        }

        const callbackUrl = `${serverUrl}/api/users/oauth/callback?provider=google`
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
          callbackUrl,
        )}&response_type=code&scope=openid%20email%20profile&state=${encodeURIComponent(
          redirect,
        )}&prompt=select_account`

        return Response.redirect(authUrl, 302)
      }

      if (provider === 'github') {
        const clientId = process.env.GITHUB_CLIENT_ID
        if (!clientId) {
          return Response.redirect(
            `${serverUrl}/login?error=${encodeURIComponent('GitHub OAuth is not configured. Missing GITHUB_CLIENT_ID.')}`,
            302,
          )
        }

        const callbackUrl = `${serverUrl}/api/users/oauth/callback?provider=github`
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
          callbackUrl,
        )}&scope=read:user%20user:email&state=${encodeURIComponent(redirect)}`

        return Response.redirect(authUrl, 302)
      }

      return Response.redirect(
        `${serverUrl}/login?error=${encodeURIComponent('Invalid OAuth provider specified.')}`,
        302,
      )
    },
  },
  {
    path: '/oauth/callback',
    method: 'get',
    handler: async (req) => {
      const serverUrl = getServerSideURL()
      const url = new URL(req.url || '', serverUrl)
      const provider = url.searchParams.get('provider')
      const code = url.searchParams.get('code')
      const state = url.searchParams.get('state') || '/account'

      if (!code || !provider) {
        return Response.redirect(
          `${serverUrl}/login?error=${encodeURIComponent('Missing OAuth authorization code or provider.')}`,
          302,
        )
      }

      try {
        let profile: OAuthProfile | null = null

        if (provider === 'google') {
          const clientId = process.env.GOOGLE_CLIENT_ID
          const clientSecret = process.env.GOOGLE_CLIENT_SECRET
          const callbackUrl = `${serverUrl}/api/users/oauth/callback?provider=google`

          const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: clientId || '',
              client_secret: clientSecret || '',
              code,
              grant_type: 'authorization_code',
              redirect_uri: callbackUrl,
            }),
          })

          const tokenData = await tokenRes.json()
          if (!tokenData.access_token) {
            throw new Error(tokenData.error_description || 'Failed to obtain Google access token')
          }

          const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
          })
          const googleUser = await userRes.json()

          profile = {
            provider: 'google',
            providerAccountId: googleUser.sub,
            email: googleUser.email,
            name: googleUser.name,
            avatarUrl: googleUser.picture,
          }
        } else if (provider === 'github') {
          const clientId = process.env.GITHUB_CLIENT_ID
          const clientSecret = process.env.GITHUB_CLIENT_SECRET
          const callbackUrl = `${serverUrl}/api/users/oauth/callback?provider=github`

          const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              code,
              redirect_uri: callbackUrl,
            }),
          })

          const tokenData = await tokenRes.json()
          if (!tokenData.access_token) {
            throw new Error(tokenData.error_description || 'Failed to obtain GitHub access token')
          }

          const userRes = await fetch('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
              'User-Agent': 'Meesho-Ecommerce-App',
            },
          })
          const githubUser = await userRes.json()

          let email = githubUser.email
          if (!email) {
            const emailsRes = await fetch('https://api.github.com/user/emails', {
              headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
                'User-Agent': 'Meesho-Ecommerce-App',
              },
            })
            const emails = await emailsRes.json()
            if (Array.isArray(emails)) {
              const primaryEmail = emails.find((e: any) => e.primary && e.verified) || emails[0]
              email = primaryEmail?.email
            }
          }

          profile = {
            provider: 'github',
            providerAccountId: String(githubUser.id),
            email: email || `${githubUser.login}@github.users.local`,
            name: githubUser.name || githubUser.login,
            avatarUrl: githubUser.avatar_url,
          }
        }

        if (!profile || !profile.email) {
          throw new Error('Unable to retrieve user profile from OAuth provider')
        }

        const user = await findOrCreateOAuthUser(req.payload, profile)
        const { cookieHeader } = generateAuthToken(req.payload, user)

        const redirectUrl = state.startsWith('/') ? `${serverUrl}${state}` : state
        const response = Response.redirect(redirectUrl, 302)
        response.headers.set('Set-Cookie', cookieHeader)
        return response
      } catch (err: any) {
        req.payload.logger.error(`OAuth error: ${err.message}`)
        return Response.redirect(
          `${serverUrl}/login?error=${encodeURIComponent(err.message || 'OAuth authentication failed')}`,
          302,
        )
      }
    },
  },
  {
    path: '/oauth/login',
    method: 'post',
    handler: async (req) => {
      try {
        const body = (await req.json?.()) || {}
        const { provider, providerAccountId, email, name, avatarUrl } = body

        if (!provider || !providerAccountId || !email) {
          return Response.json(
            { error: 'Missing required fields: provider, providerAccountId, email' },
            { status: 400 },
          )
        }

        if (provider !== 'google' && provider !== 'github') {
          return Response.json(
            { error: 'Invalid provider. Must be "google" or "github".' },
            { status: 400 },
          )
        }

        const user = await findOrCreateOAuthUser(req.payload, {
          provider,
          providerAccountId,
          email,
          name,
          avatarUrl,
        })

        const { token, cookieHeader } = generateAuthToken(req.payload, user)

        const response = Response.json(
          {
            success: true,
            user,
            token,
          },
          { status: 200 },
        )

        response.headers.set('Set-Cookie', cookieHeader)
        return response
      } catch (err: any) {
        req.payload.logger.error(`OAuth login error: ${err.message}`)
        return Response.json(
          { error: err.message || 'Internal OAuth server error' },
          { status: 500 },
        )
      }
    },
  },
]
