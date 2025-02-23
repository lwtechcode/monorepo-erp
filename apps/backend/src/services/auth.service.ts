import { prisma } from '../database/prisma';

async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

// async function register(email: string) {
//   return prisma.user.create({data:{}})
// }

export default { findByEmail };
