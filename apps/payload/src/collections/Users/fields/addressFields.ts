import type { Field } from 'payload'

export const addressSubFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        admin: {
          width: '50%',
        },
      },
      {
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        admin: {
          width: '50%',
        },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'company',
        type: 'text',
        label: 'Company / Business Name',
        admin: {
          width: '50%',
        },
      },
      {
        name: 'phone',
        type: 'text',
        label: 'Phone Number',
        admin: {
          width: '50%',
        },
      },
    ],
  },
  {
    name: 'addressLine1',
    type: 'text',
    label: 'Address Line 1',
  },
  {
    name: 'addressLine2',
    type: 'text',
    label: 'Address Line 2 (Apartment, Suite, Unit, etc.)',
  },
  {
    type: 'row',
    fields: [
      {
        name: 'city',
        type: 'text',
        label: 'City',
        admin: {
          width: '40%',
        },
      },
      {
        name: 'state',
        type: 'text',
        label: 'State / Province / Region',
        admin: {
          width: '30%',
        },
      },
      {
        name: 'postalCode',
        type: 'text',
        label: 'PIN / Postal Code',
        admin: {
          width: '30%',
        },
      },
    ],
  },
  {
    name: 'country',
    type: 'text',
    label: 'Country',
    defaultValue: 'IN',
    admin: {
      description: 'ISO 2-letter country code (default: IN)',
    },
  },
]

export const userAddressFields: Field[] = [
  {
    name: 'shippingAddress',
    type: 'group',
    label: 'Shipping Address',
    admin: {
      description: 'Default physical delivery address for orders',
    },
    fields: addressSubFields,
  },
  {
    name: 'billingAddress',
    type: 'group',
    label: 'Billing Address',
    admin: {
      description: 'Default billing address for invoices and payments',
    },
    fields: [
      {
        name: 'sameAsShipping',
        type: 'checkbox',
        label: 'Same as shipping address',
        defaultValue: true,
      },
      ...addressSubFields,
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'defaultShippingAddress',
        type: 'relationship',
        relationTo: 'addresses',
        hasMany: false,
        label: 'Default Saved Shipping Address',
        admin: {
          width: '50%',
          description: 'Link to a saved address in the Address Book',
        },
      },
      {
        name: 'defaultBillingAddress',
        type: 'relationship',
        relationTo: 'addresses',
        hasMany: false,
        label: 'Default Saved Billing Address',
        admin: {
          width: '50%',
          description: 'Link to a saved address in the Address Book',
        },
      },
    ],
  },
]
