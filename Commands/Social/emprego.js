const Discord = require("discord.js");
const admin = require("firebase-admin");
const database = admin.database();
const empregos = require("../../Utils/works.js").empregos;

function gerarOptions() {
  let options = [];

  for (var i = 0; i < empregos.length; i++) {
    options.push({ label: String(empregos[i]), value: String(i) });
  }

  return options;
}

module.exports = {
  name: "emprego",
  aliases: [],
  description: `Escolha um emprego para trabalhar`,
  usage: "emprego",
    categories: "Social",
  run: async (client, message, args) => {
    let empregoDir = `user/${message.author.id}/social/emprego`

        let emprego = await database.ref(empregoDir).once('value')
        emprego = emprego.val()

        if (empregos[emprego]) return await message.reply({ content: `💼** Você já tem um emprego: ${empregos[emprego]}**`, ephemeral: true });

        const Principal = new Discord.EmbedBuilder()
          .setTitle(`💼 Escolha um emprego`)
           .setDescription(`*São no total **(${empregos.length} empregos)** para você escolher*\n${empregos.join(`\n`)}`)


        const reply = await message.reply({
          embeds: [Principal],
          fetchReply: true,
          components: [
            new Discord.ActionRowBuilder()
              .addComponents(
                new Discord.SelectMenuBuilder()
                  .setCustomId("Nino")
                  .setPlaceholder("Escolha um emprego")
                  .addOptions(gerarOptions())
              )
          ]
        })
        const filter = (b) => b.user.id === message.author.id
        const collector = reply.createMessageComponentCollector({ filter, time: (5 * 60000) })    
        collector.on("collect", async (i) => {

          if (empregos[i.values[0]]){
            await database.ref(empregoDir).set(String(i.values[0]))
            return i.update({ content: `**Você se tornou um ${empregos[i.values[0]]}**`, components: [], embeds: []})
          } else {
            return i.update({ content: `**Algo deu errado**` })
          }
        })
      }
    }