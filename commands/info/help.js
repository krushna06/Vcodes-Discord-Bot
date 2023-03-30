const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: [],
    execute(client, message, args) {

        let target = message.mentions.users.first() || message.author;
        let member = message.guild.members.cache.get(target.id);

        let Embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`Help`)
            .setDescription(`Announcement \nhelp \nvoters\nvoter`)

        message.reply({ embeds: [Embed] });

    }
}