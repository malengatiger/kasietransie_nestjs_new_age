"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_DATABASE = void 0;
const config_1 = require("@nestjs/config");
const my_utils_1 = require("./my-utils/my-utils");
console.log(`💜💜💜 CONFIG_DATABASE MyUtils.getDatabaseUrl(): ${my_utils_1.MyUtils.getDatabaseUrl()} 💜`);
exports.CONFIG_DATABASE = 'database';
exports.default = (0, config_1.registerAs)(exports.CONFIG_DATABASE, () => ({
    users: {
        uri: my_utils_1.MyUtils.getDatabaseUrl(),
    },
}));
//# sourceMappingURL=database.config.js.map