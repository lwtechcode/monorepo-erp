import { prisma } from '../database/prisma';

async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export default { findByEmail };
