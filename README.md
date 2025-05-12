# Auto-Slowmode

[![DiscordJs](https://img.shields.io/badge/discord-js-F7DF1E?logo=javascript&color=F7DF1E)](https://github.com/discordjs/discord.js) <br/>
[![Invite Me to Your Server](https://img.shields.io/badge/Invite%20Me-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/oauth2/authorize?client_id=1226066517427486761)

A discord bot for slowing down your server.

## Features:
- Disabling DM's permanently
- Disabling a Guild's invite permanently
- Bot and general spam protection
  - When a user sends 2 Messages in different channels in less than a specific amount of time, they get a timeout.

## Permissions needed:
- Mute Members: Used for spam protection
- Manage Server: Used for security actions (DM and invte block)

## Commands:
Command | Description
--- | ---
`/toggledmblock` | Toggles wether members are allowed to send dm's or not. `default=false`
`/toggleinviteblock` | Toggles wether a guild's invites are paused or not. `default=false`
`/togglespamprotection` | Toggles wether members get a timeout on detected spam or not. `default=true`
`/setlog` | Changes the channel, in which log messages are send. `default=none`
`/setcheckingtime` | Changes the time, in which spam protection acts. `default=2s`
`/timeoutlength` | Changes the timeout for spam protection. `default=5s`

## Using the bot on your own Server
You can either
- [Invite the bot](https://discord.com/oauth2/authorize?client_id=1226066517427486761) or
- Create your own application on [Discord's developer portal](https://discord.com/developers/). Add an .env file containing your bot's token as `TOKEN=<TOKEN>` and the incident-actions execution time as `INCIDENT_ACTIONS_TIME=<TIME>` (in cron format) in the root folder. Then run `npm run bot` to start the application.

## Privacy
The bot may read and store:
Item | Reason | Storing-time | How to disable?
---|---|---|---|
User-Id's | When sending a message. Used for spam protection | `checkingTime` (`default=2s`) | Disable spam protection
Channel-Id's | When sending a message. Used for spam protection | `checkingTime` (`default=2s`) | Disable spam protection
Channel-Id | When setting a log channel | infinite | Do not set one
Guild-Id | Configuration and logging (logging only used for debugging purposes) | infinite | Necessary; do not use the bot

No data is ever shared to third parties.
