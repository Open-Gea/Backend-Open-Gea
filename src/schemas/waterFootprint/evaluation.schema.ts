import { FarmEntity } from '../../entities/farm/farm.entity';
import { ProductEntity } from '../../entities/product/product.entity';
import { UserEntity } from '../../entities/user/user.entity';

export const GWPSchema = {
  id: '/GWP',
  type: 'object',
  required: [
    'registerDate',
    'evotranspiration',
    'startDate',
    'endDate',
    'hectares',
    'tons',
    'score',
    'farm',
    'user',
    'status',
    'createdAt',
    // 'extras',
  ],
  properties: {
    registerDate: {
      type: 'string',
      minLength: 1,
      maxLength: 128,
    },
    evotranspiration:{ type: 'jsonb',},
    startDate: { type: 'timestamp' },
    endDate: { type: 'timestamp' },
    hectares: {
      type: 'int',
      minLength: 1,
      maxLength: 64,
    },
    tons: {
      type: 'int',
      minLength: 1,
      maxLength: 64,
    },
    score: {
      type: 'int',
      minLength: 1,
      maxLength: 64,
    },
    farm: { type: FarmEntity },
    user: { type: UserEntity },
/*     product: { type: ProductEntity }, */
    /*
    carbonFootprint {
      type: CarbonFootprintEntity
    }
    */
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
