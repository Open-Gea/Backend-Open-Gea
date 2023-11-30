export const updateUser = {
    id: '/User',
    type: 'object',
    required: [
      'name',
      'lastname',
      'phone',
      'country',
      'email',
      'username'
    ],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 128,
      },
      lastname: {
        type: 'string',
        minLength: 1,
        maxLength: 128,
      },
      phone: {
        type: 'string',
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
      username: {
        type: 'string',
        minLength: 1,
        maxLength: 64,
      },
      profile_picture: {
        type: 'string',
        contentEncoding: 'binary',
      }
    },
  };