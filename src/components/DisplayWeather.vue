<template>
  <div>{{ weatherData }}</div>
</template>

<script>
export default {
  name: "DisplayWeather",
  props: {
    weatherData: Array,
  },
};
</script>

<style></style>
