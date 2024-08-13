const { CommandCategory, BotClient } = require("@src/structures");
const { EMBED_COLORS, SUPPORT_SERVER } = require("@root/config.js");
const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  Message,
  ButtonBuilder,
  CommandInteraction,
  ApplicationCommandOptionType,
  ButtonStyle,
} = require("discord.js");
const { getCommandUsage, getSlashUsage } = require("@handlers/command");

const CMDS_PER_PAGE = 30;
const IDLE_TIMEOUT = 60;

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "help",
  description: "command help menu",
  category: "UTILITY",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    aliases: ["h", "desk", "dashboard"],
    usage: "[command]",
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "command",
        description: "name of the command",
        required: false,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },

  async messageRun(message, args, data) {
    let trigger = args[0];

    // !help
    if (!trigger) {
      const response = await getHelpMenu(message);
      const sentMsg = await message.safeReply(response);
      return waiter(sentMsg, message.author.id, data.prefix);
    }

    // check if command help (!help cat)
    const cmd = message.client.getCommand(trigger);
    if (cmd) {
      const embed = getCommandUsage(cmd, data.prefix, trigger);
      return message.safeReply({ embeds: [embed] });
    }

    // No matching command/category found
    await message.safeReply("No matching command found");
  },

  async interactionRun(interaction) {
    let cmdName = interaction.options.getString("command");

    // !help
    if (!cmdName) {
      const response = await getHelpMenu(interaction);
      const sentMsg = await interaction.followUp(response);
      return waiter(sentMsg, interaction.user.id);
    }

    // check if command help (!help cat)
    const cmd = interaction.client.slashCommands.get(cmdName);
    if (cmd) {
      const embed = getSlashUsage(cmd);
      return interaction.followUp({ embeds: [embed] });
    }

    // No matching command/category found
    await interaction.followUp("No matching command found");
  },
};

/**
 * @param {CommandInteraction} interaction
 */
async function getHelpMenu({ client, guild }) {
  // Menu Row
  const options = [];
  for (const [k, v] of Object.entries(CommandCategory)) {
    if (v.enabled === false) continue;
    options.push({
      label: v.name,
      value: k,
      description: `View commands in ${v.name} category`,
      emoji: v.emoji,
    });
  }

  const menuRow = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("help-menu")
      .setPlaceholder("👀 | Click to See All Commands ")
      .addOptions(options)
  );

  // Support, Invite, and Vote Links
  const supportButton = new ButtonBuilder()
    .setLabel("Support")
    .setEmoji('1238430085795545139')
    .setStyle(ButtonStyle.Link)
    .setURL("https://discord.gg/sNGBwSeZYM");

  const inviteButton = new ButtonBuilder()
    .setLabel("Invite")
    .setStyle(ButtonStyle.Link)
    .setEmoji('1238429920573784074')
    .setURL("https://discord.com/api/oauth2/authorize?client_id=1238431297974566972&permissions=8&scope=bot+applications.commands");

  const voteButton = new ButtonBuilder()
    .setLabel("Vote Me")
    .setStyle(ButtonStyle.Link)
    .setEmoji('1238429509795971116')
    .setURL("https://top.gg/servers/1143415296862978058/vote");

  const buttonsRow = new ActionRowBuilder().addComponents([supportButton, inviteButton]);

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(client.user.displayAvatarURL())
    //.setImage(`https://share.creavite.co/663f19346f72a4507e459a7b.gif`)
        /*.addFields([
        {
          name: "__**<a:loading:1238429820933640283> Features [1-9]**__",
          value: `>>> <:points:1238429964613713960> Admin 
<:users:1238430170151387186> Anime 
<:hammer:1238429706454568982> Automod 
<:cash:1238429069092196352> Economy 
<:fun:1238429593417945098> Fun 
<:notification:1238429897920221294> Giveaway 
<:link:1238429779624071219> Invite 
<:bot:1238429045243252818> Information`,
          inline: true
        },
        {
          name: "__**<a:loading:1238429820933640283> Features [10-18]**__",
          value: `>>> <:gear:1238429625055444993> Moderation 
<:fav_songs:1238429574677790810> Music 
<:lock:1238429844803686460> Owner 
<:com:1238429485817135226> Social 
<:chart:1238429306938462238> Statistics 
<:claim:1238429350655823912> Suggestions 
<:transcript:1238430085795545139> Ticket 
<:search:1238430047615058001> Utility `,
          inline: true
        }
        ])*/
    .setAuthor({name: `Safari Help Panel..!`, iconURL: client.user.displayAvatarURL()})
    .setFooter({
        text: `.help | Made With ❤️ By Faizen Sosuke`, iconURL: client.user.displayAvatarURL()
      })
    .setDescription(`
<:Knownas:1266799019472978076> ** __ABOUT ME. . !__**
> Heya, It's " __Safarii__ "A Multipurpose Discord Bot with Large Amout of Features For Greater Experience.

 <:Knownas:1266799019472978076> **__CATEGORIES. . !__**
> <:saf_owner:1260983975397032058> : Admin
> <:saf_economy:1260984067449426003> : Economy\n> <:saf_fun:1260983847282020382> : Fun-Game
> <:saf_giveaway:1260983704692723743> : Giveaway
> <:saf_image:1260983639202861067> : Image
> <:saf_invite:1260984225985990817> : Invite
> <:saf_info:1260983784397078668> : Information
> <:saf_moderation:1260983899853688935> : Moderation
> <:saf_music:1260983606336290968> : Music
> <:saf_stat:1260984327236489306> : Ranks
> <:saf_suggest:1260984023648571494> : Suggestion
> <:saf_ticket:1260983663965765642> : Ticket
> <:saf_util:1260984270726631576> : Utility
> [Invite](https://discord.com/api/oauth2/authorize?client_id=1271702857850290206&scope=bot+applications.commands&permissions=1374891928950) | [Support](https://discord.gg/faizensosuke)`);

  return {
    embeds: [embed],
    components: [menuRow, buttonsRow],
  };
}


/**
 * @param {Message} msg
 * @param {string} userId
 * @param {string} prefix
 */
const waiter = (msg, userId, prefix) => {
  const collector = msg.channel.createMessageComponentCollector({
    filter: (reactor) => reactor.user.id === userId && msg.id === reactor.message.id,
    idle: IDLE_TIMEOUT * 6000,
    dispose: true,
    time: 5 * 60 * 1000,
  });

  let arrEmbeds = [];
  let currentPage = 0;
  let menuRow = msg.components[0];
  let buttonsRow = msg.components[1];

  collector.on("collect", async (response) => {
    if (!["help-menu", "previousBtn", "nextBtn"].includes(response.customId)) return;
    await response.deferUpdate();

    switch (response.customId) {
      case "help-menu": {
        const cat = response.values[0].toUpperCase();
        arrEmbeds = prefix ? getMsgCategoryEmbeds(msg.client, cat, prefix) : getSlashCategoryEmbeds(msg.client, cat);
        currentPage = 0;

        // Buttons Row
        let components = [];
        buttonsRow.components.forEach((button) =>
          components.push(ButtonBuilder.from(button).setDisabled(arrEmbeds.length > 1 ? false : true))
        );

        buttonsRow = new ActionRowBuilder().addComponents(components);
        msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, buttonsRow] }));
        break;
      }

      case "previousBtn":
        if (currentPage !== 0) {
          --currentPage;
          msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, buttonsRow] }));
        }
        break;

      case "nextBtn":
        if (currentPage < arrEmbeds.length - 1) {
          currentPage++;
          msg.editable && (await msg.edit({ embeds: [arrEmbeds[currentPage]], components: [menuRow, buttonsRow] }));
        }
        break;
    }
  });

  collector.on("end", () => {
    if (!msg.guild || !msg.channel) return;
    return msg.editable && msg.edit({ components: [] });
  });
};

/**
 * Returns an array of message embeds for a particular command category [SLASH COMMANDS]
 * @param {BotClient} client
 * @param {string} category
 */
function getSlashCategoryEmbeds(client, category) {
  let collector = "";

  // For IMAGE Category
  if (category === "IMAGE") {
    client.slashCommands
      .filter((cmd) => cmd.category === category)
      .forEach((cmd) => (collector += `\`/${cmd.name}\``));

    const availableFilters = client.slashCommands
      .get("filter")
      .slashCommand.options[0].choices.map((ch) => ch.name)
      .join(", ");

    const availableGens = client.slashCommands
      .get("generator")
      .slashCommand.options[0].choices.map((ch) => ch.name)
      .join(", ");

    collector +=
      "**Available Filters:**\n" + `${availableFilters}` + `*\n\n**Available Generators**\n` + `${availableGens}`;

    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      //.setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription(collector);

    return [embed];
  }

  // For REMAINING Categories
  const commands = Array.from(client.slashCommands.filter((cmd) => cmd.category === category).values());

  if (commands.length === 0) {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      //.setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription("No commands in this category");

    return [embed];
  }

  const arrSplitted = [];
  const arrEmbeds = [];

  while (commands.length) {
    let toAdd = commands.splice(0, commands.length > CMDS_PER_PAGE ? CMDS_PER_PAGE : commands.length);

    toAdd = toAdd.map((cmd) => {
      const subCmds = cmd.slashCommand.options?.filter((opt) => opt.type === "SUB_COMMAND");
      const subCmdsString = subCmds?.map((s) => s.name).join(", ");

      return `<:arrow_gx:1239184074992779296>\`/${cmd.name}\`\n <:circle:1238429329231314974> ${cmd.description} \n ${
        !subCmds?.length ? "" : `❯ **SubCommands [${subCmds?.length}]**: ${subCmdsString}\n`
      } `;
    });

    arrSplitted.push(toAdd);
  }

  arrSplitted.forEach((item, index) => {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      //.setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription(item.join("\n"))
      .setFooter({ text: `page ${index + 1} of ${arrSplitted.length}` });
    arrEmbeds.push(embed);
  });

  return arrEmbeds;
}

/**
 * Returns an array of message embeds for a particular command category [MESSAGE COMMANDS]
 * @param {BotClient} client
 * @param {string} category
 * @param {string} prefix
 */
function getMsgCategoryEmbeds(client, category, prefix) {
  let collector = "";

  // For IMAGE Category
  if (category === "IMAGE") {
    client.commands
      .filter((cmd) => cmd.category === category)
      .forEach((cmd) =>
        cmd.command.aliases.forEach((alias) => {
          collector += `\`${alias}\`, `;
        })
      );

    collector +=
      "\n\nYou can use these image commands in following formats\n" +
      `**${prefix}cmd:** Picks message authors avatar as image\n` +
      `**${prefix}cmd <@member>:** Picks mentioned members avatar as image\n` +
      `**${prefix}cmd <url>:** Picks image from provided URL\n` +
      `**${prefix}cmd [attachment]:** Picks attachment image`;

    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      //.setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription(collector);

    return [embed];
  }

  // For REMAINING Categories
  const commands = client.commands.filter((cmd) => cmd.category === category);

  if (commands.length === 0) {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      //.setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription("No commands in this category");

    return [embed];
  }

  const arrSplitted = [];
  const arrEmbeds = [];

  while (commands.length) {
    let toAdd = commands.splice(0, commands.length > CMDS_PER_PAGE ? CMDS_PER_PAGE : commands.length);
    toAdd = toAdd.map((cmd) => ` \`${cmd.name}\``);
    arrSplitted.push(toAdd);
  }

  arrSplitted.forEach((item, index) => {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      //.setThumbnail(CommandCategory[category]?.image)
      .setAuthor({ name: `${category} Commands` })
      .setDescription(item.join(","))
      .setFooter({
        text: `page ${index + 1} of ${arrSplitted.length} | Use ${prefix}help For More Information`,
      });
    arrEmbeds.push(embed);
  });

  return arrEmbeds;
}