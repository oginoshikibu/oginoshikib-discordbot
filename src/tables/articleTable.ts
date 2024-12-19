import { PrismaClient } from "@prisma/client";
import type { article } from "@prisma/client";

export const insertArticle = async (url: string, title: string): Promise<{ article: article | null, error: any }> => {
    console.log(`start insertArticle`);
    const prismaClient = new PrismaClient();
    try {
        const article = await prismaClient.article.create({
            data: {
                url: url,
                title: title,
            },
        });
        console.log(`Inserted article: ${article}`, { depth: 2 });
        return { article, error: null };
    } catch (error: any) {
        console.error(`Failed to insert Article: ${error.message}`);
        return { article: null, error };
    } finally {
        await prismaClient.$disconnect();
        console.log(`end insertArticle`);
    }
}