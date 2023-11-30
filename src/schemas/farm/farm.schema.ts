export const farmSchema = {
  id: '/Farm',
  type: 'object',
  required: [
    'name',
    'owner',
    'telephone',
    'country',
    'ubication',
    'totalSurface',
    'infrastructure',
    'perimetralFence',
  ],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 128,
    },
    owner: {
      type: 'string',
      minLength: 1,
      maxLength: 128,
    },
    telephone: { type: 'string' },
    country: {
      type: 'string',
      minLength: 1,
      maxLength: 32,
    },
    ubication: {
      type: 'object',
      properties: {
        lat: { type: 'number' },
        lng: { type: 'number' },
      },
    },
    totalSurface: { type: 'string' },
    infrastructure: {
      type: 'string',
      minLength: 1,
      maxLength: 128,
    },
    perimetralFence: { type: 'string' },
    userId: { type: 'string' },
  },
};
