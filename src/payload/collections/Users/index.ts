import type { CollectionConfig } from 'payload/types'

import { email as validateEmail } from 'payload/dist/fields/validations'

import { admins } from '../../access/admins'
import { adminEmail } from '../../cron/shared'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { sanitizeDemoAdmin } from './hooks/sanitizeDemoAdmin'

const Users: CollectionConfig = {
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: admins,
    delete: () => false,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },

    {
      name: 'roles',
      access: {
        create: admins,
        read: admins,
        update: admins,
      },
      defaultValue: ['user'],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      type: 'select',
    },
  ],
  hooks: {
    afterChange: [loginAfterCreate],
  },
  slug: 'users',
  timestamps: true,
}

export default Users
