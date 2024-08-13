module.exports = {
  OWNER_IDS: ["963354050617815060"], // Bot owner ID's
  SUPPORT_SERVER: "https://discord.gg/btQJeGKKHJ", // Your bot support server
  PREFIX_COMMANDS: {
    ENABLED: true, // Enable/Disable prefix commands
    DEFAULT_PREFIX: ".", // Default prefix for the bot
  },
  INTERACTIONS: {
    SLASH: true, // Should the interactions be enabled
    CONTEXT: true, // Should contexts be enabled
    GLOBAL: true, // Should the interactions be registered globally
    TEST_GUILD_ID: "1238428698575900682", // Guild ID where the interactions should be registered. [** Test you commands here first **]
  },
  EMBED_COLORS: {
    BOT_EMBED: "#00ff39",
    TRANSPARENT: "#00ff39",
    SUCCESS: "#00ff39",
    ERROR: "#00ff39",
    WARNING: "#00ff39",
  },
  CACHE_SIZE: {
    GUILDS: 100,
    USERS: 10000,
    MEMBERS: 10000,
  },
  MESSAGES: {
    API_ERROR: "Unexpected Backend Error! Try again later or contact support server",
  },

  // PLUGINS

  AUTOMOD: {
    ENABLED: false,
    LOG_EMBED: "#00ff39",
    DM_EMBED: "#00ff39",
  },

  DASHBOARD: {
    enabled: false, // enable or disable dashboard
    baseURL: "http://localhost:8080", // base url
    failureURL: "http://localhost:8080", // failure redirect url
    port: "8080", // port to run the bot on
  },

  ECONOMY: {
    ENABLED: true,
    CURRENCY: "$",
    DAILY_COINS: 100, // coins to be received by daily command
    MIN_BEG_AMOUNT: 100, // minimum coins to be received when beg command is used
    MAX_BEG_AMOUNT: 2500, // maximum coins to be received when beg command is used
  },

  MUSIC: {
    ENABLED: true,
    IDLE_TIME: 60, // Time in seconds before the bot disconnects from an idle voice channel
    MAX_SEARCH_RESULTS: 5,
    DEFAULT_SOURCE: "YT", // YT = Youtube, YTM = Youtube Music, SC = SoundCloud
    // Add any number of lavalink nodes here
    // Refer to https://github.com/freyacodes/Lavalink to host your own lavalink server
    LAVALINK_NODES: [
      {
        host: "hk.aarubot.xyz",
        port: 57010,
        password: "Saikawa",
        id: "Music",
        secure: false,
      },
    ],
  },

  GIVEAWAYS: {
    ENABLED: true,
    REACTION: " ❤️  ",
    START_EMBED: "#00ff39",
    END_EMBED: "#00ff39",
  },

  IMAGE: {
    ENABLED: true,
    BASE_API: "https://strangeapi.hostz.me/api",
  },

  INVITE: {
    ENABLED: true,
  },

  MODERATION: {
    ENABLED: true,
    EMBED_COLORS: {
      TIMEOUT: "#00ff39",
      UNTIMEOUT: "#00ff39",
      KICK: "#00ff39",
      SOFTBAN: "#00ff39",
      BAN: "#00ff39",
      UNBAN: "#00ff39",
      VMUTE: "#00ff39",
      VUNMUTE: "#00ff39",
      DEAFEN: "#00ff39",
      UNDEAFEN: "#00ff39",
      DISCONNECT: "00ff39",
      MOVE: "00ff39",
    },
  },

  PRESENCE: {
    ENABLED: true, // Whether or not the bot should update its status
    STATUS: "online", // The bot's status [online, idle, dnd, invisible]
    TYPE: "WATCHING", // Status type for the bot [PLAYING | LISTENING | WATCHING | COMPETING]
    MESSAGE: ".Help | FaizenSosuke ", // Your bot status message
  },

  STATS: {
    ENABLED: true,
    XP_COOLDOWN: 5, // Cooldown in seconds between messages
    DEFAULT_LVL_UP_MSG: "{member:mention}, You just advanced to **Level {level}**",
  },

  SUGGESTIONS: {
    ENABLED: true, // Should the suggestion system be enabled
    EMOJI: {
      UP_VOTE: "⬆️",
      DOWN_VOTE: "⬇️",
    },
    DEFAULT_EMBED: "#00ff39",
    APPROVED_EMBED: "#00ff39",
    DENIED_EMBED: "#00ff39",
  },

  TICKET: {
    ENABLED: true,
    CREATE_EMBED: "#00ff39",
    CLOSE_EMBED: "#00ff39",
  },
};
