<template>
  <div >
    <NavBar />
    <div class="main-panel">
      <router-view />
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.main-panel{
  box-sizing: border-box;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid var(--bs-primary);
  min-width: fit-content;
  max-width: 630px;
  margin: 20px auto;
}
</style>
