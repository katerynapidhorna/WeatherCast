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
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

html,
body {
  font-family: "Poppins", sans-serif;
}

#app {
  font-family: "Poppins", sans-serif;
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
