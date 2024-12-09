import type { Interaction } from "discord.js";

const interactionCreate = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    return;
}

export default interactionCreate;