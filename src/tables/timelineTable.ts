import { PrismaClient } from "@prisma/client";
import type { Timeline } from "@prisma/client";


export const insertTimeline = async (workKindId: number, startedAt: Date, comment?: string): Promise<{ timeline: Timeline | null, error: any }> => {
    console.log(`start insertTimeline`);
    const prismaClient = new PrismaClient();
    
    // Check if workKindId exists
    await prismaClient.workKind.findFirst({
        where: {
            id: workKindId
        }
    }).then((workKind) => {
        if (!workKind) {
            console.error(`workKindId: ${workKindId} is not found`);
            return { timeline: null, error: `workKindId: ${workKindId} is not found` };
        }
    });

    try {
        const timeline = await prismaClient.timeline.create({
            data: {
                workKindId,
                startedAt,
                comment
            }
        });
        console.log(`Inserted timeline: ${timeline}`, { depth: 2 });
        return { timeline, error: null };
    } catch (error: any) {
        console.error(`Failed to insert timeline: ${error.message}`);
        return { timeline: null, error };
    } finally {
        await prismaClient.$disconnect();
        console.log(`end insertTimeline`);
    }
}
