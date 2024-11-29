const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();

module.exports = {
  name: "apagar",
  aliases: ["clear"],
  description: `Apague quantas mensagens de uma só vez`,
  usage: "apagar [quantidade]",
    categories: "Moderação",
  run: async (client, message, args) => {
    const quantia = args[0];
    if (!quantia) return message.reply(`**🚫 Você não me disse quantas mensagens deseja apagar.**`)
    
    if (isNaN(quantia)) return message.reply(`**🚫 Eu acho que ( ${quantia} ) não é um número.**`)
    
    if (quantia > 100) return message.reply(`**🚫 Você não pode apagar mais de 100 mensagens.**`)
    
    if (quantia < 1) return message.reply(`**🚫 Você não pode apagar 0 mensagens.**`)

    if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) return message.reply(`🚫`)
    message.channel.bulkDelete(quantia)
    message.channel.send(`**🗑️ ${quantia} mensagens foram apagadas**`)
  },
};
