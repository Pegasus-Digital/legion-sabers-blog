import fs from 'fs'
import path from 'path'
import payload from 'payload'

import { home } from '../seed/home'
import { postsPage } from '../seed/posts-page'
import { adminEmail, adminPassword } from './shared'

const collections = ['categories', 'media', 'pages', 'posts', 'projects', 'comments', 'users']
const globals = ['header', 'settings', 'footer']

export async function seed(): Promise<void> {
  try {
    payload.logger.info(`Seeding database...`)

    await clearDB()
    await seedDB()
    payload.logger.info(`Seed Complete.`)
  } catch (error: unknown) {
    console.error(error) // eslint-disable-line no-console
    payload.logger.error('Error seeding database.')
  }
}

export async function reset(): Promise<void> {
  try {
    payload.logger.info(`Resetting database...`)

    await clearDB()
    await seedDB()
    payload.logger.info(`Reset Complete.`)
  } catch (error: unknown) {
    console.error(error) // eslint-disable-line no-console
    payload.logger.error('Error resetting database.')
  }
}

export const clearDB = async (): Promise<void> => {
  payload.logger.info(`- Clearing media...`)

  const mediaDir = path.resolve(__dirname, '../../../media')
  if (fs.existsSync(mediaDir)) {
    fs.rmSync(path.resolve(__dirname, '../../../media'), { recursive: true })
  }

  payload.logger.info(`- Clearing collections and globals...`)
  await Promise.all([
    ...collections.map(async (collection) => {
      try {
        await payload.delete({
          collection: collection as 'media',
          where: {},
        })
      } catch (error: unknown) {
        console.error(`Error deleting collection ${collection}:`, error) // eslint-disable-line no-console
        throw error
      }
    }),
    ...globals.map(async (global) => {
      try {
        await payload.updateGlobal({
          data: {},
          slug: global as 'header',
        })
      } catch (error: unknown) {
        console.error(`Error updating global ${global}:`, error) // eslint-disable-line no-console
        throw error
      }
    }),
  ])
}

export async function seedDB(): Promise<void> {
  payload.logger.info(`- Seeding admin...`)

  const [{ id: demoAuthorID }] = await Promise.all([
    await payload.create({
      collection: 'users',
      data: {
        name: 'Legion Sabers Admin',
        email: adminEmail,
        password: adminPassword,
        roles: ['admin'],
      },
    }),
  ])

  payload.logger.info(`- Seeding posts page...`)

  const { id: postsPageID } = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(postsPage)),
  })

  payload.logger.info(`- Seeding home page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(home).replace(/\{\{POSTS_PAGE_ID\}\}/g, postsPageID)),
  })

  payload.logger.info(`- Seeding settings...`)

  await payload.updateGlobal({
    data: {
      postsPage: postsPageID,
    },
    slug: 'settings',
  })

  payload.logger.info(`- Seeding header...`)

  await payload.updateGlobal({
    data: {
      navItems: [
        {
          link: {
            label: 'Posts',
            reference: {
              relationTo: 'pages',
              value: postsPageID,
            },
            type: 'reference',
          },
        },
      ],
    },
    slug: 'header',
  })

  await payload.updateGlobal({
    data: {
      navItems: [
        {
          link: {
            label: 'Account',
            reference: undefined,
            type: 'custom',
            url: '/account',
          },
        },
      ],
    },
    slug: 'footer',
  })

  payload.logger.info('Seeded database successfully!')
}
