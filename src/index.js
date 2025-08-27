// src/index.js
import dotenv from 'dotenv';
dotenv.config();

import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

import { Client, Collection, GatewayIntentBits } from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();

async function loadCommands() {
    const foldersPath = join(__dirname, 'commands');
    const commandFolders = readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = join(foldersPath, folder);
        const commandFiles = readdirSync(commandsPath).filter((file) =>
            file.endsWith('.js'),
        );

        for (const file of commandFiles) {
            const filePath = join(commandsPath, file);
            const url = pathToFileURL(filePath).href;

            // ESM: named exports; CJS: default export containing module.exports
            const mod = await import(url);
            const command = mod.default ?? mod;

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
                );
            }
        }
    }
}

async function loadEvents() {
    const eventsPath = join(__dirname, 'events');
    const eventFiles = readdirSync(eventsPath).filter((file) =>
        file.endsWith('.js'),
    );

    for (const file of eventFiles) {
        const filePath = join(eventsPath, file);
        const url = pathToFileURL(filePath).href;

        const mod = await import(url);
        const event = mod.default ?? mod;

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}

async function main() {
    await loadCommands();
    await loadEvents();
    await client.login(process.env.TOKEN);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
