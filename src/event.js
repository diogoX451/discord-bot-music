const { player } = require(".");

module.exports = async () => {
  player.on("trackStart", async (queue, track) => {
    queue.metadata.channel.send(`🎵 Do jeitinho do sertão estamos tocando \`${track.title}\``);
  });
  player.on("trackAdd", async (queue, track) => {
    queue.metadata.channel.send(`🎵 Adicionando o pacote completo do forró \`${track.title}\``);
  });
};