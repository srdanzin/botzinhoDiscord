const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();

module.exports = {
  name: "comandos",
  aliases: ["ajuda"],
  description: `Todos os comandos listados`,
  usage: 'comandos',
  categories: 'Aplicativo',
  run: async (client, message, args) => {
    let prefix = '?'
    
    let comandos = `${client.commands.map(c => `\`${prefix}${c.name} - ${c.description}\``).join('\n')}`

    let painel = new Discord.EmbedBuilder()
    .setDescription(comandos)

    return message.reply({ embeds: [painel] })

    
    
  }
}