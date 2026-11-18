import type { Access, CollectionConfig } from 'payload'

const isAppUser: Access = ({ req }) =>
  req.user?.collection === 'users' ? { id: { equals: req.user.id } } : false

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    disableLocalStrategy: true,
  },
  access: {
    create: () => false,
    delete: isAppUser,
    read: isAppUser,
    update: isAppUser,
  },
  admin: {
    hidden: true,
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'providerId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: [
        { label: 'Google', value: 'google' },
        { label: 'Apple', value: 'apple' },
      ],
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'avatarUrl',
      type: 'text',
    },
  ],
}
