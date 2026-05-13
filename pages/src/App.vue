<script setup lang="ts">
import menuTop from './components/menuTop.vue'
import homeMain from './components/homeMain.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      isScrolled: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0
    },
  },
}
</script>

<template>
  <menuTop :is-scrolled="isScrolled" />
  <homeMain :is-scrolled="isScrolled" />
</template>
