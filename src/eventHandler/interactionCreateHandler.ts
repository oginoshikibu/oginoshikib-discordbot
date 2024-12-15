import type { Interaction } from "discord.js";

export const interactionCreateHandler = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    return;
}
