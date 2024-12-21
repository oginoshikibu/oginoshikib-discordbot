import { z } from 'zod'

const zVar = z.string().min(1)
const zEnv = z.object({
    DISCORD_BOT_TOKEN: zVar,
    CLIENT_ID: zVar,
    GUILD_ID: zVar,
    USER_ID: zVar,
    DEBUG_CHANNEL_ID: zVar,
    NOTIFICATION_CHANNEL_ID: zVar,
    ARTICLE_CHANNEL_ID: zVar,
})

const result = zEnv.safeParse(process.env)
if (!result.success) {
    throw `env type is invalid\n${result.error.errors.map((v) => `${v.message}: env.${v.path[0]}`).join('\n')}`
}


declare module 'bun' {
    interface Env extends z.infer<typeof zEnv> { }
}