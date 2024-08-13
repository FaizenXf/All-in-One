/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "emojicount",
  description: "shows the current ping from the bot to the discord servers",
  category: "INFORMATION",
  command: {
    enabled: true,
    aliases: ["ec"],
  },
  slashCommand: {
    enabled: false,
    ephemeral: false,
    options: [],
  },


  async messageRun(message, args) {
    const guild = message.guild;
    const emojis = guild.emojis.cache.size;
    await message.safeReply(`• \`${emojis} emojis!\``);
  },

  async interactionRun(interaction) {
    const guild = interaction.guild;
    const emojis = guild.emojis.cache.size;
    await interaction.followUp(`• \`${emojis} emojis!\``);
  },
};
