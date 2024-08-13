/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "boostcount",
  description: "shows the current ping from the bot to the discord servers",
  category: "INFORMATION",
  command: {
    enabled: true,
    aliases: ["bc"],
  },
  slashCommand: {
    enabled: false,
    ephemeral: false,
    options: [],
  },

  async messageRun(message, args) {
    const guild = message.guild;
    const boosts = guild.premiumSubscriptionCount;
    await message.safeReply(`• \`${boosts} boosts!\``);
  },

  async interactionRun(interaction) {
    const guild = interaction.guild;
    const boosts = guild.premiumSubscriptionCount;
    await interaction.followUp(`• \`${boosts} Boosts!\``);
  },
};
