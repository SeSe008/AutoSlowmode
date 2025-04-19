<template>
  <div id="privacy">
    <h2>Privacy</h2>
    <div id="privacy_table">
      <span>Autoslowmode may read and store:</span>
      <table>
	<thead>
	  <tr>
	    <th>Item</th>
	  <th>Reason</th>
	    <th>Storing-time</th>
	    <th>How to disable?</th>
	  </tr>
	</thead>
	<tbody>
	  <tr>
	    <td>User-Id's</td>
	    <td>When sending a message. Used for spam protection</td>
	    <td><strong>checkingTime</strong> (<strong>default=2s</strong>)</td>
	    <td>Disable spam protection</td>
	  </tr>
	  <tr>
	    <td>Channel-Id's</td>
	    <td>When sending a message. Used for spam protection</td>
	    <td><strong>checkingTime</strong> (<strong>default=2s</strong>)</td>
	    <td>Disable spam protection</td>
	  </tr>
	  <tr>
	    <td>Channel-Id</td>
	    <td>When setting a log channel</td>
	    <td><strong>infinite</strong></td>
	    <td>Do not set one</td>
	  </tr>
	  <tr>
	    <td>Guild-Id</td>
	    <td>Configuration and logging (logging only used for debugging purposes)</td>
	    <td><strong>infinite</strong></td>
	    <td>Necessary; do not use the bot</td>
	  </tr>
	</tbody>
      </table>
      <span>No data is ever shared to third parties</span>
    </div>
  </div>
</template>



<style lang="css" scoped>
#privacy {
  display: flex;
  flex-direction: column;
  gap: 2.5vh;
}

h2 {
  color: rgb(var(--color6));
  font-size: xx-large;
  text-align: center;
}

#privacy_table {
  width: 100%;
  height: min-content;
  padding: 1rem 5rem;
  background-color: rgba(var(--color4), 0.3);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  font-size: calc(8px + .5vmin);
}

table {
  width: max-content;
  max-width: 100%;
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

span {
  color: rgb(var(--color6));
}
</style>

