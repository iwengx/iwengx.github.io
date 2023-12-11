<script setup>
const theme = () => {
  document.querySelector("html").classList.toggle("dark");
};
</script>

<template>
  <div class="wengx-home-page">
    <!-- <button class="theme-btn" @click="theme">dark/light</button> -->
  </div>
</template>

<style lang="scss" scoped>
.wengx-home-page {
  width: 100%;
  height: 100vh;
  background-color: rgb(187, 187, 187);
}
.theme-btn {
  background-color: red;
}
</style>
