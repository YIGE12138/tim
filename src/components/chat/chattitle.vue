<template>
  <div class="chatTitle">
    <span class="titleName">{{this.$store.state.currentSession.nickname?this.$store.state.currentSession.nickname:""}}</span>
  </div>
</template>

<script>
  export default {
    name: "chattitle"
  }
</script>

<style scoped>
  .chatTitle{
    height: 50px;
    width: 100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    border-bottom: 0.5px solid #c7d2db;
  }
  .titleName{
    margin: 10px 20px;
  }
</style>
