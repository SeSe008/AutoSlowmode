<div align="center">
	<img alt="Logo" src="https://sese008.github.io/AutoSlowmode/assets/icon-CMvE8VJy.svg" />
	<h1>AutoSlowmode</h1>
	<h2>Automatically slow down your server</h2>
	<div style="display: flex; justify-content: center; gap: 1rem;">
		<a href="https://discord.com/oauth2/authorize?client_id=1226066517427486761"><img style="height: 48px;" alt="Invite Me!" src="https://img.shields.io/badge/Invite%20Me-7289DA?style=for-the-badge&logo=discord&logoColor=white" /></a>
		<a href="https://sese008.github.io/AutoSlowmode/"><img style="height: 48px;" alt="Website" src="https://img.shields.io/badge/%F0%9F%8C%8D%20Website-\?style=for-the-badge&logoColor=white&color=black" /></a>
	</div>
</div>

## Capabilities:

- Disabling DM's permanently
- Disabling a Guild's invites permanently
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
`/setlog <channel>` | Changes the channel, in which log messages are send. `default=none`
`/settimeoutchecktime <time>` | Changes the time, in which spam protection can act. `default=2s`
`/settimeoutlength <time>` | Changes the timeout enacted on possible spammers. default=5s

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
