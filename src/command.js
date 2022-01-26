const { player } = require(".");

module.exports = async (client, msg, args, command) => {
  if (command === "tocar") {
    const channel = msg.member.voice.channel;
    if (!channel)
      return msg.channel.send("Você precisa entrar no canal de voz!!!");

    const search_music = args.join(" ");
    if (!search_music)
      return msg.channel.send("Digite o nome ou link da musica!!!");

    const queue = player.createQueue(msg.guild.id, {
      metadata: {
        channel: msg.channel,
      },
    });

    try {
      if (!queue.connection) await queue.connect(channel);
    } catch (error) {
      queue.destroy();
      return await msg.reply({
        content: "Não foi possivel entrar no server!!",
        ephemeral: true,
      });
    }

    const song = await player
      .search(search_music, {
        requestedBy: msg.author,
      })
      .then((x) => x.tracks[0]);
      //caso de erro de achar a muica 
    client.user.setActivity(song.title, { type: "LISTENING" });
    if (!song) return msg.reply(`Não achei junin a música : ${search_music}!!!`);
    queue.play(song);

    msg.channel.send({ content: `⏳ | Buscando... **${song.title}**!` });
    //pular proxima música 
  } else if (command === "skip") {
    const queue = player.getQueue(msg.guild.id);
    queue.skip();
    msg.channel.send(`Proxima música...`);
    // Parar música 
  } else if (command === "stop") {
    const queue = player.getQueue(msg.guild.id);
    queue.stop();
    msg.channel.send(`Cansei um tiquin junin...`);
    //Pausar a música
  } else if (command === "pause") {
    const queue = player.getQueue(msg.guild.id);
    queue.setPaused(true);
    msg.channel.send(`Vai lá junin...`);
    // Voltar a música
  } else if (command === "continue") {
    const queue = player.getQueue(msg.guild.id);
    queue.setPaused(false);
    msg.channel.send(`Toca a boa junin...`);
  }
};