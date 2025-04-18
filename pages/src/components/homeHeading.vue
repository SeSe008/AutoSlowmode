<template>
  <div id="heading">
    <h1 id="title">Auto Slowmode</h1>
    <span id="subtitle">A discord bot for slowing down your server</span>
    <div id="heading_links">
      <a
        class="heading_link"
        href="https://discord.com/oauth2/authorize?client_id=1226066517427486761"
      >
        <i class="pi pi-discord"></i>
        <span>Invite to Server</span>
      </a>
      <a class="heading_link" href="https://github.com/SeSe008/AutoSlowmode">
        <i class="pi pi-github"></i>
        <span>GitHub</span>
      </a>
    </div>
  </div>
</template>

<style lang="css" scoped>
#heading {
  height: min-content;
  background-color: rgba(var(--color4), 0.3);
  color: rgb(var(--color6));
  text-align: center;
  padding: 7.5vh 0.5rem;
  display: flex;
  flex-direction: column;
}

#title {
  font-size: xxx-large;
  font-weight: 800;
  margin: 0;
}

#subtitle {
  margin-top: 1rem;
  font-size: large;
}

#heading_links {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}

.heading_link {
  text-decoration: none;
  color: rgb(var(--color6));
  padding: 1rem;
  border: 1px solid rgb(var(--color6));
  border-radius: 0.5rem;
  background-color: transparent;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  outline: none;
}

.heading_link i {
  font-size: 1.5rem;
}

.heading_link:hover {
  background-color: rgb(var(--color4));
  box-shadow: 0 0 0.5rem rgb(var(--color4));
}
</style>
