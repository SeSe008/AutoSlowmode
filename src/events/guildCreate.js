const { Events } = require('discord.js');
const { guilds } = require('../../global.js');

module.exports = {
    name: Events.GuildCreate,
    execute(guild) {
        const guildId = guild.id;

        console.log(`Got added to guild ${guildId}`);

        guilds.push(guildId);
    }
}