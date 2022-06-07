<template>
  <div>
    <img src="../assets/images/1.jpg" alt="" @click="toPage('/home')" />
  </div>
</template>
<script>
  export default {
    name: 'welcomeView',
    methods: {
      toPage(path) {
        this.$router.push(path)
      },
    },
  }
</script>
