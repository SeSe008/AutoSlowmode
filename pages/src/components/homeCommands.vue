<template>
  <div id="commands">
    <h2>Commands</h2>
    <div id="command_table">
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>/toggledmblock</strong></td>
            <td>
              Toggles whether members are allowed to send DM's or not. <strong>default=false</strong>
            </td>
          </tr>
	  <tr>
	    <td><strong>/toggleinviteblock</strong></td>
	    <td>Toggles wether a guild's invites are paused or not. <strong>default=false</strong></td>
	  </tr>
          <tr>
            <td><strong>/togglespamprotection</strong></td>
            <td>
              Toggles whether members get a timeout on detected spam or not.
              <strong>default=true</strong>
            </td>
          </tr>
          <tr>
            <td><strong>/setlog</strong></td>
            <td>
              Changes the channel in which log messages are sent. <strong>default=none</strong>
            </td>
          </tr>
          <tr>
            <td><strong>/setcheckingtime</strong></td>
            <td>Changes the time in which spam protection acts. <strong>default=2s</strong></td>
          </tr>
          <tr>
            <td><strong>/timeoutlength</strong></td>
            <td>Changes the timeout for spam protection. <strong>default=5s</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="css" scoped>
#commands {
  display: flex;
  flex-direction: column;
  gap: 2.5vh;
}

h2 {
  color: rgb(var(--color6));
  font-size: xx-large;
  text-align: center;
}
#command_table {
  width: 100%;
  height: min-content;
  padding: 1rem 5rem;
  background-color: rgba(var(--color4), 0.3);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

table {
  width: max-content;
  color: rgb(var(--color6));
  border-collapse: collapse;
}

tr,
th,
td {
  border: 2px solid rgb(var(--color4));
}

th,
td {
  padding: 0.5rem;
  text-align: left;
}

strong {
  font-family: monospace !important;
  background-color: rgb(var(--color3));
  padding: 0.25rem;
  border-radius: 0.25rem;
}
</style>
