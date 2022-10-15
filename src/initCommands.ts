const { REST, SlashCommandBuilder, Routes } = require('discord.js');
import config from '../config.json';

const commands = [
	new SlashCommandBuilder().setName('authorblogs').setDescription('Fetches author commands!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(config.clientToken);

export const initCommands = () => {
rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands })
	.then((data: any) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
}