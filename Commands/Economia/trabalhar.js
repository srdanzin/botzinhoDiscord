const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();
const ms = require("../../Utils/parsems");
const moment = require("moment-timezone");
moment.locale("pt-BR");
const math = require("mathjs");
const empregos = require("../../Utils/works.js").empregos;
const emojis = require("../../Utils/works.js").emojis;
const trabalhando = require("../../Utils/works.js").trabalhando;

module.exports = {
  name: "trabalhar",
  aliases: ["work"],
  description: `Trabalhe para receber dinheiro`,
  usage: "trabalhar",
    categories: "Economia",
  run: async (client, message, args) => {
    let moneyDir = `user/${message.author.id}/economy/dinheiro`;
    let empregoDir = `user/${message.author.id}/social/emprego`;
    let cooldownDir = `user/${message.author.id}/cooldowns/trabalhar`;

    let money = await database.ref(moneyDir).once("value");
    let emprego = await database.ref(empregoDir).once("value");
    let cooldown = await database.ref(cooldownDir).once("value");

    money = money.val() || 0;
    emprego = emprego.val();
    cooldown = cooldown.val();

    let timeouut = 300000;
    let time = ms(timeouut - (Date.now() - cooldown));
    if (cooldown !== null && timeouut - (Date.now() - cooldown) > 0)
      return message.reply(
        `**Descanse um pouco, volte quando o cronometro tiver zerado: ${time.minutes}m ${time.seconds}s.**`,
      );

    const actionRow = new Discord.ActionRowBuilder().addComponents([
      new Discord.ButtonBuilder({
        customId: "trabalhar",
        label: empregos[emprego],
        style: Discord.ButtonStyle.Primary,
        emoji: emojis[emprego],
      }),
    ]);

    const reply = await message.reply({
      content: `**💼 Clique no botão para trabalhar**`,
      components: [actionRow],
      fetchReply: true,
    });

    const filter = (b) => b.user.id === message.author.id;
    const collector = reply.createMessageComponentCollector({
      filter,
      time: 5 * 60000,
    });
    collector.on("collect", async (i) => {
      if (i.customId == "trabalhar") {
        let timeout = 300000;
        var valor = Math.floor(Math.random() * 450);

        if (cooldown == null) {
          await database.ref(moneyDir).set(money + 1500);

          await database.ref(cooldownDir).set(Date.now());

          let primeiro_dia = new Discord.EmbedBuilder()
            .setTitle(`${empregos[emprego]}: ${trabalhando(emprego)}`)
            .addFields(
              {
                name: `Você iria receber pelo seu trabalho:`,
                value: `${valor} Dinheiros`,
              },
              {
                name: `Porém, como é seu primeiro dia de trabalho, você ganhou:`,
                value: `1.500 Dinheiros`,
              },
            )
            .setFooter({
              text: `Utilize (?saldo) para ver seu dinheiro.`,
            });

          return i.update({
            embeds: [primeiro_dia],
            components: [],
          });
        }
        if (timeout - (Date.now() - cooldown) < 0) {
          await database.ref(cooldownDir).set(Date.now());

          await database.ref(moneyDir).set(money + valor);

          let trabalhou = new Discord.EmbedBuilder()
            .setTitle(`${empregos[emprego]}: ${trabalhando(emprego)}`)
            .addFields({
              name: `Você recebeu pelo seu trabalho:`,
              value: `${valor} Dinheiros`,
            })
            .setFooter({
              text: `Utilize (?saldo) para ver seu dinheiro.`,
            });

          return i.update({
            embeds: [trabalhou],
            components: [],
          });
        }
      }
    });
  },
};
