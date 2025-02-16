const { guilds } = require('../global.js');

// Load joined guilds
function load(client) {
    const Guilds = client.guilds.cache.map(guild => guild.id);
    Guilds.forEach(guildId => {
        if (!guilds.includes(guildId)) {
            guilds.push(guildId);
        }
    });
}

module.exports = { load };