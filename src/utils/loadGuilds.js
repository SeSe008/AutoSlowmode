const { messages, addGuild, getGuilds } = require('../global.js');

// Load joined guilds
function load(client) {
    const Guilds = client.guilds.cache.map((guild) => guild.id);
    Guilds.forEach((guildId) => {
        messages[guildId] = [];
        addGuild(guildId);
    });
}

module.exports = { load };
