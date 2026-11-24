import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { adminOnly } from '@/access/adminOnly'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'parent', 'displayType', 'menuOrder', 'isFeatured'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Category Name',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Category Description',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        description:
          'WooCommerce-style category description displayed on archive pages and category banners.',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      label: 'Parent Category',
      admin: {
        position: 'sidebar',
        description:
          'Assign a parent category to create a subcategory / category hierarchy (like WooCommerce).',
      },
      filterOptions: ({ id }) => {
        if (!id) return true
        return {
          id: {
            not_equals: id,
          },
        }
      },
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Products', value: 'products' },
        { label: 'Subcategories', value: 'subcategories' },
        { label: 'Both', value: 'both' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'WooCommerce category display type: choose whether to show products, subcategories, or both on the category page.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail / Image',
      admin: {
        position: 'sidebar',
        description:
          'Primary category thumbnail used for category cards, grids, and navigation.',
      },
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Banner / Hero Image',
      admin: {
        position: 'sidebar',
        description: 'Header banner image displayed on the category archive page.',
      },
    },
    {
      name: 'menuOrder',
      type: 'number',
      label: 'Menu Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description:
          'Integer order for custom category sorting (lower values display first).',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured Category',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Feature this category in top navigation, home page grids, or promotion sections.',
      },
    },
    slugField({
      position: 'sidebar',
    }),
    {
      name: 'subcategories',
      type: 'join',
      collection: 'categories',
      on: 'parent',
      admin: {
        allowCreate: false,
        defaultColumns: ['title', 'slug', 'menuOrder'],
        description: 'Subcategories nested under this category.',
      },
    },
    {
      name: 'products',
      type: 'join',
      collection: 'products',
      on: 'categories',
      admin: {
        allowCreate: false,
        defaultColumns: ['title', 'slug', 'priceInUSD'],
        description: 'Products assigned to this category.',
      },
    },
  ],
}
