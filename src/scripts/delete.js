const global = require('../global.js');

module.exports = {
    deleteoldmsg: async function () {
        setInterval(() => {
            console.log('Checking for old messages...', global.messages);
            for (const [guildId, data] of Object.entries(global.messages)) {
                const checkingTime = global.checkingTime[guildId] ? global.checkingTime[guildId] * 1000 : global.defaultCheckingTime * 1000;

                console.log(checkingTime);
                
                global.messages[guildId] = data.filter(message => {
                    return message[1] >= Date.now() - checkingTime;
                });
            }
            console.log('Old messages deleted.', global.messages);
        }, 10000);
    }
}