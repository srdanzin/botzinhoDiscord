const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();
const empregos = require("../../Utils/works.js").empregos;

let botão = new Discord.ActionRowBuilder().addComponents(
  new Discord.ButtonBuilder()
    .setCustomId("aceito")
    .setLabel("Sim")
    .setStyle(Discord.ButtonStyle.Success),
  new Discord.ButtonBuilder()
    .setCustomId("nego")
    .setLabel("Não")
    .setStyle(Discord.ButtonStyle.Danger),
);

module.exports = {
  name: "demissão",
  aliases: [],
  description: `Demissão? Você quem sabe!`,
  usage: "demissão",
    categories: "Social",
  run: async (client, message, args) => {
    let empregoDir = `user/${message.author.id}/social/emprego`;
    let moneyDir = `user/${message.author.id}/economy/dinheiro`;

    let emprego = await database.ref(empregoDir).once("value");
    let money = await database.ref(moneyDir).once("value");
    
    emprego = emprego.val();
    money = money.val() || 0;

    if (!emprego) return message.reply("Você precisa de um emprego!")

    const Principal = new Discord.EmbedBuilder()
      .setDescription(
      `Você atualmente está trabalhando como: ${empregos[emprego]}\nDeseja pedir demissão?\n\n\nGostaria de informa-lo que ao solicitar uma demissão, terá que pagar uma taxa de R$ 500,00 (A taxa existe para evitar o uso da demissão varias vezes).`,
    );

    const reply = await message.reply({
      embeds: [Principal],
      fetchReply: true,
      components: [botão],
    });
    const filter = (b) => b.user.id === message.author.id;
    const collector = reply.createMessageComponentCollector({
      filter,
      time: 5 * 60000,
    });
    collector.on("collect", async (i) => {
      if (i.customId == "aceito") {
        await database.ref(empregoDir).set(null);
        await database.ref(moneyDir).set(money - 500);
        return i.update({
          content: `**:white_check_mark: Você pediu demissão com sucesso!**`,
          components: [],
          embeds: []
        });
      } else {
        return i.update({
          content: `**:x: Você cancelou a demissão!**`,
          components: [],
          embeds: []
        });
      }
    });
  },
};
