import * as mongoose from 'mongoose';
import { MyUtils } from './my-utils/my-utils';
console.log(`💚💚💚 databaseProviders - mongoose.connect() 💚`);

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(MyUtils.getDatabaseUrl()),
  },
];
