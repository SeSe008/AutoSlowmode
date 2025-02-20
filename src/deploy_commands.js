const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag} (${client.user.id}).`);

    // Create a new REST instance
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    // Fetch all guilds the bot is in (via client.guilds.cache).
    const guilds = client.guilds.cache;

    // Deploy commands to each guild
    for (const [guildId, guild] of guilds) {
        try {
            console.log(`\n[INFO] Refreshing ${commands.length} application (/) commands for guild "${guild.name}" (${guildId})...`);
            
            // Deploy (overwrite) all commands in this guild
            const data = await rest.put(
                Routes.applicationGuildCommands(client.user.id, guildId),
                { body: commands },
            );

            console.log(`[SUCCESS] Reloaded ${data.length} commands for guild "${guild.name}".`);
        } catch (error) {
            console.error(`[ERROR] Could not refresh commands for guild "${guild.name}" (${guildId}):`);
            console.error(error);
        }
    }

    console.log('\nDone refreshing commands for all guilds.');

    process.exit(0);
});

client.login(process.env.TOKEN);
