STARTAR TYPEORM
npx typeorm init --database postgres

CRIAR MIGRATIONS:
npx typeorm migration:create ./src/database/migrations/create-users-table

EXECUTAR MIGRATION
npm run typeorm migration:run -- -d src/database/data-source

TUTORIAL ENVIO DE EMAIL:
https://www.youtube.com/watch?v=klDTBiW6iiM&ab_channel=Devisty

------ PRISMA -------

Executar migrate: npx prisma migrate dev --create-only

Executar migration no banco de dados: npx prisma migrate deploy

Reset migrations: npx prisma migrate reset

Prisma generate: prisma generate

OBSERVAÇÕES:

1. Criar permissões para funcionar o cadastro de usuarios.
