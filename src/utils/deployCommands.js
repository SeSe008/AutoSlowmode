import { REST, Routes } from 'discord.js';

import dotenv from 'dotenv';
dotenv.config();

import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const commands = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const foldersPath = join(__dirname, '..', 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) =>
        file.endsWith('.js'),
    );

    for (const file of commandFiles) {
        const fileUrl = pathToFileURL(join(commandsPath, file)).href;

        const mod = await import(fileUrl);

        const command = mod.default ?? mod;

        if (command?.data && command?.execute) {
            commands.push(command.data.toJSON());
        } else {
            console.log(
                `[WARNING] The command at ${join(commandsPath, file)} is missing a required "data" or "execute" property.`,
            );
        }
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

export async function deployCommandsToGuild(clientId, guild) {
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
