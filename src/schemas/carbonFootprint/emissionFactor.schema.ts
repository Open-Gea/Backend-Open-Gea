export const emissionFactorSchema = {
  id: '/EmissionFactor',
  type: 'object',
  required: [
    'name',
    'category',
    'emission_factor',
    'formula',
    'unit',
    'countries',
    'years',
  ],
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
    emission_factor: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
    formula: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
    unit: {
      type: 'string',
      minLength: 1,
      maxLength: 64,
    },
    countries: { type: 'array' },
    years: {
      type: 'int',
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
