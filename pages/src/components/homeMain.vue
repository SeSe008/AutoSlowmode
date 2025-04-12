<script lang="ts">
import homeHeading from './homeHeading.vue'
import homeCapabilities from './homeCapabilities.vue'
import homeCommands from './homeCommands.vue'
import homeLinks from './homeLinks.vue'

export default {
  components: {
    homeHeading,
    homeCapabilities,
    homeCommands,
    homeLinks,
  },
  props: {
    isScrolled: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
<template>
  <div id="home" :class="{ scrolled: isScrolled }">
    <homeHeading />
    <homeCapabilities />
    <homeCommands />
    <homeLinks />
  </div>
</template>

<style lang="css" scoped>
#home {
  position: absolute;
  width: 100%;
  top: 25vh;
  display: flex;
  flex-direction: column;
  gap: 5vh;
}
</style>
