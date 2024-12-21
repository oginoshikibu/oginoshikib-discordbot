import { ActionRowBuilder, ButtonBuilder, type CommandInteraction, type Message } from "discord.js";
import { getRandomArticle, insertArticle } from "../tables/articleTable";
import { articleDeleteButton } from "../buttons";


export const registerArticleByMessage = async (message: Message): Promise<void> => {

    console.log(`start registerArticleByMessage`);

    // 正しいURLかどうかをURLクラスを使って判定
    const parsedMessageURL = (() => {
        try {
            return new URL(message.content);
        }
        catch (error) {
            message.reply('Invalid URL');
            console.error(error);
            return null;
        }
    })();
    if (!parsedMessageURL) return;

    // URLからタイトルを取得
    const fetchWithTimeout = async (url: string, timeout: number): Promise<Response> => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        let response: Response;
        try {
            response = await fetch(url, { signal: controller.signal });
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error('Fetch request timed out');
            }
            throw error;
        }
        clearTimeout(id);
        return response;
    };

    const articleTitle = await (async () => {
        console.log(`Fetching title from ${parsedMessageURL.href}`);
        try {
            const response = await fetchWithTimeout(parsedMessageURL.href, 5000); // 5 seconds timeout
            const html = await response.text();
            const titleMatch = html.match(/<title>(.*?)<\/title>/);
            const title = titleMatch ? titleMatch[1] : 'No title found';
            console.log(`Fetched title: ${title}`);
            return title;
        } catch (error: any) {
            console.error(`Failed to fetch title: ${error.message}`);
            await message.react('❌');  //  title取得失敗時
            return 'No title found';
        }
    })();

    // データベースに登録
    const { article, error } = await insertArticle(parsedMessageURL.href, articleTitle);
    if (article) {
        await message.react('👍');  //  成功時
    } else {
        await message.reply(`Failed to insert Article: ${error.message}`);
    }

    console.log(`end registerArticleByMessage`);
}


export const replyRandomArticle = async (receivedMessage: CommandInteraction | Message): Promise<void> => {
    console.log('start replyRandomArticle');

    const { article, error } = await getRandomArticle();

    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(articleDeleteButton.button);

    if (article) {
        await receivedMessage.reply({
            content: `id ${article.id}\n[${article.title}](${article.url})`, // 削除参照用にidをcontentに追加（message内にmetadataを仕込めない為）
            components: [row],
        });
    } else {
        await receivedMessage.reply(`Failed to get random article: ${error.message}`);
    }

    console.log('end replyRandomArticle');
}
