const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'announcement',
  aliases: [],
  async execute(client, message, args) {
    const response = await axios.get('https://api.vcodes.xyz/v1/bot/1047853733431738418/announcements').then(res => res.data).catch(() => false);
    const data = response.data;

    //console.log(response, data);

    const title = data[0].title;
    const description = data[0].description;

    //console.log('Title: ' + title);
    //console.log('Description: ' + description);
    
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor('BLUE');

    message.reply({ embeds: [embed] });
  },
};