export const cooperativeSchema = {
  id: '/Cooperatives',
  type: 'object',
  required: [
    'name',
    'country',
    'email',
    'password',
  ],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 128,
    },
    profile_picture: {
      type: 'string',
      contentEncoding: 'binary',
    },
    country: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 1,
    },
  },
};
