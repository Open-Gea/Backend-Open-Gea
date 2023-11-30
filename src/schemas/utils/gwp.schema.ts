export const GWPSchema = {
  id: '/GWP',
  type: 'object',
  required: [
    'name',
    'formula',
    'value',
  ],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 128,
    },
    formula: {
      type: 'string',
      minLength: 1,
      maxLength: 128,
    },
    value: { type: 'number' },
  },
};
