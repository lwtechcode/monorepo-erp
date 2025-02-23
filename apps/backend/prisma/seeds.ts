import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const USER_COMPANY_ID = "c348661b-c5d7-4b4f-a3f8-308d3e49bebe";

function generateRandomNumberString(length: number): string {
  let randomNumberString = "";
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10).toString();
    randomNumberString += randomDigit;
  }
  return randomNumberString;
}

function generateRandomGender(): string {
  return Math.random() < 0.5 ? "F" : "M";
}

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 200; i++) {
    const client = {
      name: faker.person.fullName(),
      birthDate: faker.date.past().toISOString(),
      cpf: generateRandomNumberString(11),
      gender: generateRandomGender(),
      rg: generateRandomNumberString(10),
      email: faker.internet.email().toLowerCase(),
      phone: generateRandomNumberString(11),
      cep: generateRandomNumberString(8),
      address: faker.location.streetAddress(),
      number: faker.number.int().toString(),
      neighborhood: faker.location.county(),
      city: faker.location.city(),
      state: faker.location.state(),
      complement: faker.location.secondaryAddress(),
      active: faker.datatype.boolean(),
      // deleted: faker.datatype.boolean(),
      created_at: faker.date.recent().toISOString(),
      observation: faker.lorem.paragraph(),
      user_company_id: USER_COMPANY_ID,
    };
    await prisma.client.create({ data: client });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
