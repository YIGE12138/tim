<template>
  <div id="app">
    <div class="toolbar">
      <toolbar></toolbar>
    </div>
    <div class="sidebar">
      <list></list>
    </div>
    <div class="main">
      <chattitle></chattitle>
      <message></message>
      <usertext></usertext>
    </div>
  </div>
</template>

<script>
  import list from '../components/list.vue'
  import message from '../components/message.vue'
  import usertext from '../components/usertext.vue'
  import toolbar from "../components/toolbar.vue";
  import chattitle from "../components/chattitle.vue"

  export default {

    name: 'ChatRoom',
    mounted:function() {
      this.$store.dispatch('initData');
      this.$store.dispatch('connect');
    },
    created () {
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("state",JSON.stringify(this.$store.state))
      })
    },
    components:{
      toolbar,
      list,
      message,
      usertext,
      chattitle
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    margin: 80px auto;
    width: 1000px;
    height: 650px;
    overflow: hidden;
    border-radius: 10px;
    .sidebar, .main ,.toolbar{
      height: 100%;
    }
    .toolbar{
      float: left;
      color: #f4f4f4;
      background-color: #2e3238;
      width: 60px;
    }
    .sidebar {
      float: left;
      color: #000000;
      background-color: #ECEAE8;
      width: 240px;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }
  }
</style>

