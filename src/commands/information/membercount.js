/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "membercount",
  description: "shows the current ping from the bot to the discord servers",
  category: "INFORMATION",
  command: {
    enabled: true,
    aliases: ["mc"],
  },
  slashCommand: {
    enabled: false,
    ephemeral: false,
    options: [],
  },

  async messageRun(message, args) {
    const guild = message.guild;
    const members = guild.members.cache.size;
    await message.safeReply(`• \`${members} Members!\``);
  },

  async interactionRun(interaction) {
    const guild = interaction.guild;
    const members = guild.members.cache.size;
    await interaction.followUp(`• \`${members} Members!\``);
  },
};

