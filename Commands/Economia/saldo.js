const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();

module.exports = {
  name: "saldo",
  aliases: ["conta", "atm", "carteira"],
  description: `Acesse seu saldo`,
  usage: "saldo (user)",
    categories: "Economia",
  run: async (client, message, args) => {
    const member =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    let moneyDir = `user/${member.id}/economy/dinheiro`;
    let bancoDir = `user/${member.id}/economy/banco`;

    let money = await database.ref(moneyDir).once("value");
    money = money.val() || 0;

    let banco = await database.ref(bancoDir).once("value");
    banco = banco.val() || 0;

    let conta = new Discord.EmbedBuilder()
      .setDescription(`Dinheiro: ${money}\nBanco: ${banco}`)
      .setColor(0x2f3136);

    return message.reply({ embeds: [conta] });
  },
};
