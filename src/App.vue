<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import Header from "./components/content/header/Header";
import Tab from "./components/content/tab/Tab";
import Player from "./components/content/palyer/Player";

export default {
  name: 'App',
  components: {
    Header,
    Tab,
    Player
  }
}
</script>

<style lang="scss">
  @import "./assets/css/base.css";
  @import "./components/common/scss/reset.scss";
  @import "./components/common/scss/ali-icon.scss";

  #app{
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
