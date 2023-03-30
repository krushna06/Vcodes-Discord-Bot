const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'voter',
  setDescription: `Displays the latest voter`,
  aliases: [],
  async execute(client, message, args) {
    const response = await axios.get('https://api.vcodes.xyz/v1/bot/1047853733431738418/voters').then(res => res.data).catch(() => false);
    const data = response.data.data;

    const user = data[0].id;

    const embed = new MessageEmbed()
      .setTitle(`Latest voter`)
      .setDescription(user)
      .setColor('BLUE');

    message.reply({ embeds: [embed] });
  },
};