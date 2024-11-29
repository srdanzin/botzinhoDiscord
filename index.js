const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs')
require("dotenv").config()

const database = require("./Utils/firebase")()
require('./Utils/website.js')()

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Channel],
});

client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands");

module.exports = client;

["events", "commands"].forEach(handler => {
  require(`./Structures/${handler}`)(client);
});

client.login(secrets.TOKEN);
