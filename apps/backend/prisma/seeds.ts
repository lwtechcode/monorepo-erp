import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Verifica se a permissão "admin" já existe
  const adminPermission = await prisma.permission.findUnique({
    where: { name: 'ADMIN' },
  });

  if (!adminPermission) {
    // Se não existir, cria a permissão "admin"
    await prisma.permission.create({
      data: {
        name: 'ADMIN',
      },
    });
  }

  console.log('Permissão "ADMIN" inserida com sucesso.');
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
