<template>
  <div id="links">
    <a href="https://github.com/SeSe008/">
      <i class="pi pi-github"></i>
      <span>SeSe008</span>
    </a>
    <a href="https://discord.com/users/813744649440722956">
      <i class="pi pi-discord"></i>
      <span>se008</span>
    </a>
    <a href="mailto:s.radenba@gmail.com">
      <i class="pi pi-envelope"></i>
      <span>s.radenba@gmail.com</span>
    </a>
  </div>
</template>

<style lang="css" scoped>
#links {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2.5rem;
  background-color: rgba(var(--color4), 0.3);
}

#links > a {
  text-decoration: none;
  color: rgb(var(--color6));
  padding: 1rem;
  border: 1px solid rgb(var(--color6));
  border-radius: 0.5rem;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  outline: none;
}
</style>
