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
    for(const authorBlogUpdate of authorBlogUpdates){
      authorBlogUpdate === authorBlogUpdates[0] ? await interaction.reply(authorBlogUpdate) : await interaction.followUp(authorBlogUpdate);
    }
}
});

client.login(configFile.clientToken);
initCommands();