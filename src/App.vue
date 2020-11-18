<template>
  <div id="app">
    <SearchWeather />
  </div>
</template>

<script>
import SearchWeather from "./components/SearchWeather.vue";

export default {
  name: "App",
  components: {
    SearchWeather,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
