import type { Interaction } from "discord.js";
import * as commandMap from '../commands';
import type { Command } from "../commands/types";

export const interactionCreateHandler = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    // 型推論
    const commands: Record<string, Command> = commandMap;
    const { commandName } = interaction;

    try {
        const command: Command = commands[commandName];
        await command.execute(interaction);
    } catch (error: any) {
        console.error(error);
        await interaction.reply({ content: `There was an error while executing this command! \n ${error}`, ephemeral: true });
    }
    return;
}
