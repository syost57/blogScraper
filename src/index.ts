import { Client, GatewayIntentBits } from 'discord.js';
import { fetchBlogUpdates } from './authorBlogs';
import { initCommands } from './initCommands';
import configFile from '../config.json';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.on('ready', () => {
  console.log(`Logged in as Jeeves!`);
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