<script lang="ts">
export default {
  props: {
    isScrolled: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    scrollTo(y: number) {
      window.scroll({
        top: y,
        behavior: 'smooth',
      })
    },
    scrollToElement(id: string, offset: number = 0) {
      const element = document.getElementById(id)
      if (element) {
        this.scrollTo(element.offsetTop - offset)
      }
    },
  },
}
</script>
<template>
  <div id="menu" :class="{ scrolled: isScrolled }">
    <button @click="scrollTo(0)"><img src="@/assets/icons/icon.svg" alt="Icon" /></button>
    <button @click="scrollToElement('capabilities', 10)">Capabilities</button>
    <button @click="scrollToElement('commands', 10)">Commands</button>
    <div class="spacer"></div>
    <a
      class="heading_link"
      href="https://discord.com/oauth2/authorize?client_id=1226066517427486761&scope=bot&permissions=8"
    >
      <i class="pi pi-discord"></i>
    </a>
    <a class="heading_link" href="https://github.com/SeSe008/AutoSlowmode">
      <i class="pi pi-github"></i>
    </a>
  </div>
</template>

<style lang="css" scoped>
#menu {
  position: fixed;
  z-index: 10;
  top: 0;
  height: 6.5%;
  width: 100%;
  background-color: rgb(var(--color3));
  transition: box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  box-sizing: border-box;
}

#menu > button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  color: rgb(var(--color6));
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.25rem;
  z-index: 5;
}

#menu > button {
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  color: rgb(var(--color6));
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.25rem;
  z-index: 5;
}

#menu > button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: rgba(var(--color2), 0.3);
  z-index: 0;
  transition: width 0.3s ease-in-out;
}

#menu > button:hover::before {
  width: 100%;
}

#menu > a {
  text-decoration: none;
  color: rgb(var(--color6));
  max-width: 10%;
  padding: 0 0.5rem;
  align-self: center;
}

#menu * {
  max-height: 100%;
}

#menu.scrolled {
  box-shadow: 0 0.5rem 0.5rem 0 rgb(var(--color4));
}
</style>
