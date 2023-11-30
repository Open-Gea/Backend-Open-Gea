export const reportSchema = {
  id: '/Report',
  type: 'object',
  required: [
    'reporter',
    'screenshot',
    'date',
    'status',
  ],
  properties: {
    reporter: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
    screenshot: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
    date: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
  },
};
