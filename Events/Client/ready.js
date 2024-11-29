const client = require('../../index.js');
const Discord = require("discord.js");

client.on("ready", () => {
  console.log("Iniciado como " + client.user.username)
  var tabela = [

    { name: `© foxy`, type: "WATCHING" },
  ];
  function setStatus() {
    var altstatus = tabela[Math.floor(Math.random() * tabela.length)];
    client.user.setActivity(altstatus.name, {
      type: altstatus.type
    }); 
  }
  setStatus(); 
  setInterval(() => setStatus(), 1500); 
});
