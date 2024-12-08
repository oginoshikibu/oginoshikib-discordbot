import { PrismaClient } from "@prisma/client";
import type { Message } from "discord.js";
import { JSDOM } from "jsdom";


export const registarArticleByMessage = async (message: Message): Promise<void> => {

    // 正しいURLかどうかをURLクラスを使って判定
    const parsedMessageURL = (() => {
        try {
            return new URL(message.content);
        }
        catch (error) {
            message.reply('Invalid URL');
            return null;
        }
    })();
    if (!parsedMessageURL) return;

    // URLからタイトルを取得
    const articleTitle = await (async () => {
        const response = await fetch(parsedMessageURL.href);
        const html = await response.text();
        // JSDOMを使ってDOMを生成し、title要素を取得（なければ'No title'を返す）
        // 非効率かも……けど正規表現で取得するのもなんか違う気がする……？
        const dom = new JSDOM(html);
        const title = dom.window.document.querySelector('title')?.textContent || 'No title';
        return title;
    })();

    // データベースに登録
    const prismaClient = new PrismaClient();
    const Article = await (async () => {
        try {
            return await prismaClient.article.create({
                data: {
                    url: parsedMessageURL.href,
                    title: articleTitle,
                },
            });
        } catch (error: any) {
            message.reply(`Failed to register article: ${error.message}`);
            return null;
        }
    })();
    if (!Article) return;

    await message.react('👍');  //  成功時
    await prismaClient.$disconnect();
}