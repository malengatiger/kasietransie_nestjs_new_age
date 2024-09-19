import { registerAs } from '@nestjs/config';
import { MyUtils } from './my-utils/my-utils';
console.log(
  `💜💜💜 CONFIG_DATABASE MyUtils.getDatabaseUrl(): ${MyUtils.getDatabaseUrl()} 💜`,
);
export const CONFIG_DATABASE = 'database';

export default registerAs(CONFIG_DATABASE, () => ({
  users: {
    uri: MyUtils.getDatabaseUrl(),
  },
}));
