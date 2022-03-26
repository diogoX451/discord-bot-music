
// chamando todas as bibliotecas e exportando arquivos 
const {Client} = require('discord.js');
const {Player} = require('discord-player');
const  {token, prefix} = require('../config.json');


// definir client de acordo com a documentação do Discord.js
const client = new Client({
    restTimeOffset: 0,
    shards: "auto",
    intents: 641,
  });
  
// Resposta do bot 
  client.on("ready", ()=> {
      console.log("Nos conformes");

  });
// comandos do bot
client.on("messageCreate", (msg)=> {
  if(!msg.guild)return;
  if(!msg.content.startsWith(prefix)) return;
  
  if(msg.content == prefix + "Eai"){
      msg.reply({
          content: "Eai Zé",
      });
  } else if(msg.content == prefix + "Bom dia"){
      msg.reply({
          content:" Opa "+ msg.author.username + " como vai cumpadre?",
      });
  } else if(msg.content == prefix + "server"){
    msg.reply(`Server name: ${msg.guild.name}\nTotal de ${msg.guild.memberCount} membros `);
  }
  // Criando reações
  if( msg.content == prefix + "reagir"){
    msg.reply({ content: "Está usando uma reação com Emoji...", fetchReplays: true});
      msg.react('😀');
      msg.react('🤐');
  }

});
// player
const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 5000,
    autoSelfDeaf: true,
    initialVolume: 50,
    bufferingTimeout: 3000,
  });
  module.exports = { player, client };
  require("./event")(client);

  client.on("messageCreate", (msg) => {
    if (!msg.guild || msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
  
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    require("./command")(client, msg, args, command);
  });

  // ligar o bot
client.login(token);