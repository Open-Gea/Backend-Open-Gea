export const userSchema = {
  id: '/User',
  type: 'object',
  required: [
    'name',
    'lastname',
    'phone',
    'country',
    'email',
    'username',
    'password',
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
    profile_picture: {
      type: 'string',
      contentEncoding: 'binary',
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
    password: {
      type: 'string',
      minLength: 1,
    },
    
  },
};
