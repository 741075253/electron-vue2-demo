<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss">
  @import '@/style/base.scss';
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100vw;
    height: 100vh;
    background: url(./assets/images/bg.png);
  }
</style>
