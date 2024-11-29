let Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();
const ms = require("../../Utils/parsems");
const moment = require("moment-timezone");
moment.locale("pt-BR");

module.exports = {
  name: "daily",
  aliases: ["diario"],
  description: "Colete a recompensa diaria!",
  usage: "daily",
  categories: "Economia",

  run: async (client, message, guild) => {
    let cooldownDir = `user/${message.author.id}/cooldowns/daily`;

    let moneyDir = `user/${message.author.id}/economy/dinheiro`;
    let cooldown = await database.ref(cooldownDir).once("value");
    cooldown = cooldown.val();

    let money = await database.ref(moneyDir).once("value");
    money = money.val() || 0;

    let timeout = 86400000;

    let valor = Math.floor(Math.random() * 650) + 2500;

    if (timeout - (Date.now() - cooldown) < 0) {
      await database.ref(moneyDir).set(money + valor);

      await database.ref(cooldownDir).set(Date.now());

      return message.channel.send({
        content: `**👑 Você coletou sua recompensa**\n**${valor} Dinheiros foram adicionado ao seu banco**`,
        components: [],
      });
    }

    let time = ms(timeout - (Date.now() - cooldown));
    return message.channel.send({
      content: `**🚫 Você já coletou sua recompensa de premium hoje!\nVolte em: ${time.hours} hora(s), ${time.minutes} minutos, e ${time.seconds} segundos.**`,
      components: [],
    });
  },
};
