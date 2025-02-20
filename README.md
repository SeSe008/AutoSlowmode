# Auto-Slowmode

[![DiscordJs](https://img.shields.io/badge/discord-js-F7DF1E?logo=javascript&color=F7DF1E)](https://github.com/discordjs/discord.js)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)<br>
[![Invite Me to Your Server](https://img.shields.io/badge/Invite%20Me-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/oauth2/authorize?client_id=1226066517427486761&scope=bot&permissions=8)

A discord bot for slowing down your server.

## Features:
- Disabling DM's permanently
- Bot and general spam protection
  - When a user sends 2 Messages in different channels in less than a specific amount of time, they get a timeout.

## Commands:
| Command      | Description      |
| ------------- | ------------- |
| `/toggledmblock` | Toggles wether members are allowed to send dm's or not. `default=false` |
| `/setlog` | Changes the channel, in which log messages are send. `default=none` |
| `/setcheckingtime` | Changes the time, in which spam protection acts. `default=2s` |
| `/timeoutlength` | Changes the timeout for spam protection. `default=5s` |
