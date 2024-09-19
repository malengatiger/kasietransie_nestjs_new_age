"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
const my_utils_1 = require("./my-utils/my-utils");
console.log(`💚💚💚 databaseProviders - mongoose.connect() 💚`);
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => mongoose.connect(my_utils_1.MyUtils.getDatabaseUrl()),
    },
];
//# sourceMappingURL=database.providers.js.map