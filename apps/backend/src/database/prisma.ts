import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

prisma.$connect().catch((error) => {
  console.log(error);
});
