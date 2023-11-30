export const cropCoefficientSchema = {
  id: '/CropCoefficient',
  type: 'object',
  required: ['name', 'category', 'init', 'end', 'mid'],
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 128,
    },
    category: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
    init: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
    end: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
    mid: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },

    createdAt: {
      type: 'timestamp',
      default: () => 'now()',
    },
    // extras: {
    //   type: 'jsonb',
    //   default: JSON.stringify({ firstRun: false }),
    // },
  },
};
