import { webpackBundler } from '@payloadcms/bundler-webpack' // bundler-import
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'

import { payloadCloud } from '@payloadcms/plugin-cloud'
// import formBuilder from '@payloadcms/plugin-form-builder'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'

import Categories from './collections/Categories'
import Comments from './collections/Comments'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import Users from './collections/Users'
import BeforeLogin from './components/BeforeLogin'
import { clearDBEndpoint, resetDBEndpoint, seedDBEndpoint } from './endpoints/resetDB'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'

const generateTitle: GenerateTitle = () => {
  return 'Pegasus Demo'
}

const m = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  admin: {
    autoLogin: {
      email: 'demo@pegasusds.com.br',
      password: 'demo',
      prefillOnly: true,
    },
    bundler: webpackBundler(), // bundler-config
    components: {
      beforeLogin: [BeforeLogin],
    },
    // livePreview: {
    //   breakpoints: [
    //     {
    //       name: 'mobile',
    //       height: 667,
    //       label: 'Mobile',
    //       width: 375,
    //     },
    //   ],
    // },
    // components: {
    //   graphics: {
    //     Icon,
    //     Logo,
    //   },
    // },
    meta: {
      favicon: './public/favicon.ico',
      ogImage: './puclic/logo.svg',
      titleSuffix: ' | Pegasus',
    },
    user: Users.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          express: m,
          [path.resolve(__dirname, './cron/reset')]: m,
        },
      },
    }),
  },
  collections: [Pages, Posts, Projects, Media, Categories, Users, Comments],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  editor: lexicalEditor({}),
  endpoints: [resetDBEndpoint, seedDBEndpoint, clearDBEndpoint],
  globals: [Settings, Header, Footer],
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  rateLimit: {
    max: 10000, // limit each IP per windowMs
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end
  plugins: [
    // formBuilder({}),
    redirects({
      collections: ['pages', 'posts'],
    }),
    nestedDocs({
      collections: ['categories'],
    }),
    seo({
      collections: ['pages', 'posts', 'projects'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    payloadCloud(),
  ],
})
