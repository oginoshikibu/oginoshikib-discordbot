import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const workKindSeeds = [
    { id: 1, name: '就寝' },
    { id: 2, name: '起床' },
    { id: 3, name: '生活' },
    { id: 4, name: '仕事' },
    { id: 5, name: '雑務' },
    { id: 6, name: 'chill' },
    { id: 7, name: '外出' },
];


async function main() {

    workKindSeeds.forEach(async (workKindSeed) => {
        try {
            const workKind = await prismaClient.workKind.create({
                data: workKindSeed,
            });
            console.log(`Inserted workKind: ${workKind}`, { depth: null });
        } catch (error: any) {
            console.error(`Failed to insert workKind: ${error.message}`);
        }
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prismaClient.$disconnect();
    });
