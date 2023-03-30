const Discord = require("discord.js");
const { Client, Intents, Collection } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');
const vCodes = require('vcodes.js');
require('dotenv').config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});
/**********************************************************
 *VCODES.XYZ VOTE START
*********************************************************/
const app = express();
const port = process.env.port;
const webhook = new Discord.WebhookClient({id: process.env.webhook_id, token: process.env.webhook_token});
client.on("vote", async (data) => {
  //console.log(data);
  const user = data.user;
  const avatar = data.avatar;
  const votes = data.votes;
  const daily = votes.daily;
  const weekly = votes.weekly;
  /*const monthly = votes.monthly;*/
  const total = votes.total;

  const embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`<@${user.id}> just voted on Vcodes.xyz`)
    .addField(`Daily:`, `${daily}`)
    .addField(`Weekly:`, `${weekly}`)
    /*.addField(`Monthly:`, `${monthly}`)*/
    .addField(`Total:`, `${total}`)
    .setThumbnail (avatar)
    .setTimestamp();

  try {
    await webhook.send({
      embeds: [embed.toJSON()]
    });
    console.log(`Sent webhook message for ${user.tag}`);
  } catch (error) {
    console.error(`Error sending webhook message: ${error}`);
  }
});

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const vote = req.body;
  client.emit('vote', vote);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Vcodes.xyz webhook listening at http://localhost:${port}`);
});
/**********************************************************
 *VCODES.XYZ VOTE END
**********************************************************/