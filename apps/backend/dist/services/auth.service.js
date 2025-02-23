"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
async function findByEmail(email) {
    return prisma_1.prisma.user.findUnique({ where: { email } });
}
// async function register(email: string) {
//   return prisma.user.create({data:{}})
// }
exports.default = { findByEmail };
