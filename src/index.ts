import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { fetchBlogUpdates } from './authorBlogs';
import { initCommands } from './initCommands';
import configFile from '../config.json';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
    const channel = await client.channels.cache.get(configFile.mainChannel) as TextChannel;
    channel.send("Jeeves is online!");
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'authorblogs') {
    const authorBlogUpdates = await fetchBlogUpdates();
    if(authorBlogUpdates.length > 0){
    for(const authorBlogUpdate of authorBlogUpdates){
      authorBlogUpdate === authorBlogUpdates[0] ? await interaction.reply(authorBlogUpdate.notificationText) : await interaction.followUp(authorBlogUpdate.notificationText);
    }
  }else{
    await interaction.reply('No new blog posts from registered authors at this time!')
  }
}
});

client.login(configFile.clientToken);
initCommands();