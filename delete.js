const global = require('./global.js');

module.exports = {
    deleteoldmsg: async function () {
        setInterval(() => {
            console.log('Checking for old messages...', global.messages, Date.now());
            global.messages = Object.fromEntries(Object.entries(global.messages).filter(([key, value]) => {
                return value[1] >= Date.now() - global.checkingTime;
            }));
            console.log('Old messages deleted.', global.messages);
        }, 10000);
    }
}