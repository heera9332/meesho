import type { Field } from 'payload'

export const userSocialFields: Field[] = [
  {
    name: 'avatarUrl',
    type: 'text',
    label: 'Profile Photo / Avatar URL',
    admin: {
      description: 'Profile avatar image URL, synced from Google, GitHub, or custom URL',
    },
  },
  {
    name: 'authProvider',
    type: 'select',
    label: 'Primary Auth Provider',
    defaultValue: 'email',
    options: [
      { label: 'Email & Password', value: 'email' },
      { label: 'Google OAuth', value: 'google' },
      { label: 'GitHub OAuth', value: 'github' },
      { label: 'Multiple Providers', value: 'multiple' },
    ],
    admin: {
      position: 'sidebar',
      description: 'Method used to authenticate this user',
    },
  },
  {
    name: 'socialLogins',
    type: 'group',
    label: 'Social Logins',
    admin: {
      description: 'Connected social identity profiles',
    },
    fields: [
      {
        name: 'google',
        type: 'group',
        label: 'Google Account',
        fields: [
          {
            name: 'id',
            type: 'text',
            label: 'Google ID (sub)',
            index: true,
          },
          {
            name: 'email',
            type: 'text',
            label: 'Google Email',
          },
          {
            name: 'name',
            type: 'text',
            label: 'Google Name',
          },
          {
            name: 'picture',
            type: 'text',
            label: 'Google Avatar URL',
          },
          {
            name: 'lastLogin',
            type: 'date',
            label: 'Last Login with Google',
          },
        ],
      },
      {
        name: 'github',
        type: 'group',
        label: 'GitHub Account',
        fields: [
          {
            name: 'id',
            type: 'text',
            label: 'GitHub User ID',
            index: true,
          },
          {
            name: 'username',
            type: 'text',
            label: 'GitHub Username',
          },
          {
            name: 'email',
            type: 'text',
            label: 'GitHub Email',
          },
          {
            name: 'avatarUrl',
            type: 'text',
            label: 'GitHub Avatar URL',
          },
          {
            name: 'lastLogin',
            type: 'date',
            label: 'Last Login with GitHub',
          },
        ],
      },
    ],
  },
  {
    name: 'socialAccounts',
    type: 'array',
    label: 'Connected Social Accounts',
    admin: {
      description: 'Extensible list of third-party OAuth accounts linked to this user',
    },
    fields: [
      {
        name: 'provider',
        type: 'select',
        required: true,
        options: [
          { label: 'Google', value: 'google' },
          { label: 'GitHub', value: 'github' },
          { label: 'Apple', value: 'apple' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'Other', value: 'other' },
        ],
      },
      {
        name: 'providerAccountId',
        type: 'text',
        required: true,
        label: 'Provider Account ID',
        admin: {
          description: 'Unique user ID assigned by the OAuth provider',
        },
      },
      {
        name: 'email',
        type: 'text',
        label: 'Provider Email',
      },
      {
        name: 'name',
        type: 'text',
        label: 'Display Name',
      },
      {
        name: 'avatarUrl',
        type: 'text',
        label: 'Avatar URL',
      },
      {
        name: 'linkedAt',
        type: 'date',
        label: 'Linked Date',
        defaultValue: () => new Date().toISOString(),
      },
    ],
  },
]
