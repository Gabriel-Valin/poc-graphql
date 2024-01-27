import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            sales: {
                create: [
                    {
                        description: faker.lorem.words(10),
                        value: faker.number.int({ min: 1000, max: 15000 }),
                    },
                    {
                        description: faker.lorem.words(10),
                        value: faker.number.int({ min: 1000, max: 15000 }),
                    },
                    {
                        description: faker.lorem.words(10),
                        value: faker.number.int({ min: 1000, max: 15000 }),
                    },
                    {
                        description: faker.lorem.words(10),
                        value: faker.number.int({ min: 1000, max: 15000 }),
                    },
                    {
                        description: faker.lorem.words(10),
                        value: faker.number.int({ min: 1000, max: 15000 }),
                    }
                ]
            }
        }
    })
}

main()

    .then(async () => {

        await prisma.$disconnect()

    })

    .catch(async (e) => {

        console.error(e)

        await prisma.$disconnect()

        process.exit(1)

    })