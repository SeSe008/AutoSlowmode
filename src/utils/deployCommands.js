const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const foldersPath = path.join(__dirname, '..', 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
            );
        }
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

async function deployCommandsToGuild(clientId, guild) {
    try {
        console.log(
            `[INFO] Deploying ${commands.length} commands to guild "${guild.name}" (${guild.id})...`,
        );

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guild.id),
            { body: commands },
        );

        console.log(
            `[SUCCESS] Deployed ${data.length} commands to guild "${guild.name}" (${guild.id}).`,
        );
    } catch (error) {
        console.error(
            `[ERROR] Failed to deploy commands to "${guild.name}" (${guild.id}):`,
            error,
        );
    }
}

module.exports = { deployCommandsToGuild };
