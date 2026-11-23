import type { Payload, PayloadRequest } from 'payload'
import type { Category, Media } from '@/payload-types'

export function createLexicalDescription(text: string) {
  return {
    root: {
      type: 'root',
      direction: null,
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          direction: null,
          format: '' as const,
          indent: 0,
          version: 1,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              type: 'text',
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

export interface CategorySeedDef {
  title: string
  slug: string
  description: string
  displayType: 'default' | 'products' | 'subcategories' | 'both'
  menuOrder: number
  isFeatured: boolean
  parentSlug?: string
  mediaKey?: 'heroImage' | 'hatImage' | 'tshirtImage'
}

export const PARENT_CATEGORIES: CategorySeedDef[] = [
  {
    title: "Women's Ethnic",
    slug: 'womens-ethnic',
    description:
      'Discover exquisite ethnic wear for women. Browse sarees, designer kurtis, lehenga cholis, and festive collections crafted with rich fabrics and intricate embroidery.',
    displayType: 'both',
    menuOrder: 1,
    isFeatured: true,
    mediaKey: 'heroImage',
  },
  {
    title: "Men's Fashion",
    slug: 'mens-fashion',
    description:
      "Explore the latest men's clothing trends including casual t-shirts, formal shirts, ethnic kurtas, denim, and everyday essentials at unbeatable value.",
    displayType: 'both',
    menuOrder: 2,
    isFeatured: true,
    mediaKey: 'tshirtImage',
  },
  {
    title: 'Electronics & Tech',
    slug: 'electronics',
    description:
      'Upgrade your lifestyle with trending gadgets, high-fidelity wireless audio, smartwatches, fast chargers, and smart home tech accessories.',
    displayType: 'products',
    menuOrder: 3,
    isFeatured: true,
  },
  {
    title: 'Home & Kitchen',
    slug: 'home-kitchen',
    description:
      'Transform your living space with stylish home decor, bedsheets, durable cookware, kitchen storage organizers, and modern lighting.',
    displayType: 'both',
    menuOrder: 4,
    isFeatured: true,
  },
  {
    title: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    description:
      'Nourish your skin and glow with herbal skincare, ayurvedic formulations, premium cosmetics, fragrances, and daily personal care essentials.',
    displayType: 'products',
    menuOrder: 5,
    isFeatured: true,
  },
  {
    title: 'Accessories',
    slug: 'accessories',
    description:
      'Complete your outfit with curated accessories: hats, caps, belts, wallets, backpacks, and everyday utility gear.',
    displayType: 'both',
    menuOrder: 6,
    isFeatured: false,
    mediaKey: 'hatImage',
  },
]

export const SUBCATEGORIES: CategorySeedDef[] = [
  // Under Women's Ethnic
  {
    title: 'Sarees',
    slug: 'sarees',
    parentSlug: 'womens-ethnic',
    description:
      'Traditional Banarasi, Kanjeevaram, georgette, and printed daily wear sarees.',
    displayType: 'products',
    menuOrder: 1,
    isFeatured: true,
  },
  {
    title: 'Kurtis & Kurta Sets',
    slug: 'kurtis-kurta-sets',
    parentSlug: 'womens-ethnic',
    description:
      'Trendy Anarkali, straight-cut, and palazzo kurta sets for casual and festive occasions.',
    displayType: 'products',
    menuOrder: 2,
    isFeatured: true,
  },
  {
    title: 'Lehengas & Festive',
    slug: 'lehengas',
    parentSlug: 'womens-ethnic',
    description:
      'Stunning bridal and festive lehenga cholis with embroidery and mirror work.',
    displayType: 'products',
    menuOrder: 3,
    isFeatured: false,
  },

  // Under Men's Fashion
  {
    title: 'T-Shirts',
    slug: 't-shirts',
    parentSlug: 'mens-fashion',
    description: '100% pure cotton graphic tees, solid crewnecks, and polo shirts.',
    displayType: 'products',
    menuOrder: 1,
    isFeatured: true,
    mediaKey: 'tshirtImage',
  },
  {
    title: 'Casual & Formal Shirts',
    slug: 'shirts',
    parentSlug: 'mens-fashion',
    description: 'Sharp formal and relaxed casual slim-fit button-down shirts.',
    displayType: 'products',
    menuOrder: 2,
    isFeatured: false,
  },
  {
    title: 'Men Ethnic Wear',
    slug: 'mens-ethnic',
    parentSlug: 'mens-fashion',
    description: 'Classic Nehru jackets, cotton kurtas, and festive pyjama sets for men.',
    displayType: 'products',
    menuOrder: 3,
    isFeatured: false,
  },

  // Under Electronics & Tech
  {
    title: 'Audio & Headphones',
    slug: 'audio-headphones',
    parentSlug: 'electronics',
    description:
      'Noise-cancelling over-ear headphones, true wireless earbuds, and bluetooth speakers.',
    displayType: 'products',
    menuOrder: 1,
    isFeatured: true,
  },
  {
    title: 'Smart Wearables',
    slug: 'smart-wearables',
    parentSlug: 'electronics',
    description: 'Fitness smartwatches, activity trackers, and health monitoring bands.',
    displayType: 'products',
    menuOrder: 2,
    isFeatured: false,
  },

  // Under Home & Kitchen
  {
    title: 'Kitchen & Cookware',
    slug: 'kitchen-cookware',
    parentSlug: 'home-kitchen',
    description:
      'Non-stick pans, pressure cookers, stainless steel cutlery, and meal containers.',
    displayType: 'products',
    menuOrder: 1,
    isFeatured: false,
  },
  {
    title: 'Home Decor & Lighting',
    slug: 'home-decor',
    parentSlug: 'home-kitchen',
    description:
      'Ambient ceramic lamps, wall clocks, aesthetic planters, and accent cushions.',
    displayType: 'products',
    menuOrder: 2,
    isFeatured: true,
  },

  // Under Beauty & Wellness
  {
    title: 'Skincare & Serums',
    slug: 'skincare',
    parentSlug: 'beauty-wellness',
    description:
      'Hydrating moisturizers, glow face serums, sunscreen lotions, and cleansers.',
    displayType: 'products',
    menuOrder: 1,
    isFeatured: true,
  },
  {
    title: 'Makeup & Cosmetics',
    slug: 'makeup',
    parentSlug: 'beauty-wellness',
    description:
      'Long-lasting lipsticks, kajal, foundation, and daily beauty essentials.',
    displayType: 'products',
    menuOrder: 2,
    isFeatured: false,
  },

  // Under Accessories
  {
    title: 'Hats & Caps',
    slug: 'hats',
    parentSlug: 'accessories',
    description:
      'Adjustable baseball caps, bucket hats, and classic brimmed outdoor hats.',
    displayType: 'products',
    menuOrder: 1,
    isFeatured: false,
    mediaKey: 'hatImage',
  },
  {
    title: 'Bags & Wallets',
    slug: 'bags-wallets',
    parentSlug: 'accessories',
    description: 'Genuine leather wallets, travel duffels, and everyday backpacks.',
    displayType: 'products',
    menuOrder: 2,
    isFeatured: false,
  },
]

export interface SeedCategoriesArgs {
  payload: Payload
  req?: PayloadRequest
  clearExisting?: boolean
  mediaMap?: {
    heroImage?: number | Media
    hatImage?: number | Media
    tshirtImage?: number | Media
  }
}

export async function seedCategories({
  payload,
  req,
  clearExisting = false,
  mediaMap = {},
}: SeedCategoriesArgs): Promise<{
  categories: Category[]
  categoryMap: Record<string, Category>
  accessoriesCategory: Category
  tshirtsCategory: Category
  hatsCategory: Category
}> {
  payload.logger.info(`— Seeding WooCommerce-style Categories...`)

  if (clearExisting) {
    await payload.db.deleteMany({ collection: 'categories', req, where: {} })
  }

  const categoryMap: Record<string, Category> = {}
  const allCreatedCategories: Category[] = []

  // Step 1: Create top-level parent categories
  for (const def of PARENT_CATEGORIES) {
    const existing = await payload.find({
      collection: 'categories',
      req,
      where: {
        slug: {
          equals: def.slug,
        },
      },
      limit: 1,
    })

    const imageRef = def.mediaKey && mediaMap[def.mediaKey] ? mediaMap[def.mediaKey] : undefined
    const mediaId = typeof imageRef === 'object' ? imageRef?.id : imageRef

    let categoryDoc: Category
    if (existing.docs.length > 0) {
      categoryDoc = existing.docs[0] as Category
    } else {
      categoryDoc = (await payload.create({
        collection: 'categories',
        req,
        data: {
          title: def.title,
          slug: def.slug,
          description: createLexicalDescription(def.description),
          displayType: def.displayType,
          menuOrder: def.menuOrder,
          isFeatured: def.isFeatured,
          image: mediaId,
        },
      })) as Category
    }

    categoryMap[def.slug] = categoryDoc
    allCreatedCategories.push(categoryDoc)
  }

  // Step 2: Create subcategories with hierarchical parent references
  for (const def of SUBCATEGORIES) {
    const parent = def.parentSlug ? categoryMap[def.parentSlug] : undefined
    const parentId = parent ? parent.id : undefined

    const existing = await payload.find({
      collection: 'categories',
      req,
      where: {
        slug: {
          equals: def.slug,
        },
      },
      limit: 1,
    })

    const imageRef = def.mediaKey && mediaMap[def.mediaKey] ? mediaMap[def.mediaKey] : undefined
    const mediaId = typeof imageRef === 'object' ? imageRef?.id : imageRef

    let categoryDoc: Category
    if (existing.docs.length > 0) {
      categoryDoc = existing.docs[0] as Category
    } else {
      categoryDoc = (await payload.create({
        collection: 'categories',
        req,
        data: {
          title: def.title,
          slug: def.slug,
          parent: parentId,
          description: createLexicalDescription(def.description),
          displayType: def.displayType,
          menuOrder: def.menuOrder,
          isFeatured: def.isFeatured,
          image: mediaId,
        },
      })) as Category
    }

    categoryMap[def.slug] = categoryDoc
    allCreatedCategories.push(categoryDoc)
  }

  payload.logger.info(
    `✓ Successfully seeded ${allCreatedCategories.length} categories (${PARENT_CATEGORIES.length} top-level parents, ${SUBCATEGORIES.length} subcategories).`,
  )

  return {
    categories: allCreatedCategories,
    categoryMap,
    accessoriesCategory: categoryMap['accessories'],
    tshirtsCategory: categoryMap['t-shirts'],
    hatsCategory: categoryMap['hats'],
  }
}
