import type { CollectionConfig } from 'payload'

export const CommitteeMembers: CollectionConfig = {
  slug: 'committee-members',
  labels: {
    singular: 'Committee Member',
    plural: 'Committee Members',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'sortOrder', 'isActive'],
    description: 'Manage the HACK 2027 organizing committee members.',
    group: 'Team',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
      admin: {
        description: 'The full name of the committee member.',
      },
    },
    {
      name: 'designation',
      type: 'text',
      required: true,
      label: 'Designation / Role',
      admin: {
        description: 'Their role in the organizing committee (e.g. "Chief Organizer & Event Director").',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
      admin: {
        description:
          'Upload a profile photograph. Supported formats: JPG, JPEG, PNG, WEBP. Recommended: square crop, minimum 400×400px.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'linkedinUrl',
          type: 'text',
          label: 'LinkedIn Profile URL',
          admin: {
            description: 'Full LinkedIn profile URL (e.g. https://linkedin.com/in/username)',
            width: '50%',
          },
          validate: (value: unknown) => {
            if (!value) return true
            if (typeof value === 'string' && value.includes('linkedin.com')) return true
            return 'Please enter a valid LinkedIn URL'
          },
        },
        {
          name: 'instagramUrl',
          type: 'text',
          label: 'Instagram Profile URL',
          admin: {
            description: 'Full Instagram profile URL (e.g. https://instagram.com/username)',
            width: '50%',
          },
          validate: (value: unknown) => {
            if (!value) return true
            if (typeof value === 'string' && value.includes('instagram.com')) return true
            return 'Please enter a valid Instagram URL'
          },
        },
        {
          name: 'githubUrl',
          type: 'text',
          label: 'GitHub Profile URL',
          admin: {
            description: 'Full GitHub profile URL (e.g. https://github.com/username)',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first. Use this to control the display order.',
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Only active members are displayed on the website.',
        position: 'sidebar',
      },
    },
    {
      name: 'isFaculty',
      type: 'checkbox',
      label: 'Faculty In-Charge',
      defaultValue: false,
      admin: {
        description: 'Check this if this member is a Faculty In-Charge (displayed separately).',
        position: 'sidebar',
      },
    },
  ],
}
