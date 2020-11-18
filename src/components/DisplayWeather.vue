<template>
  <div v-if="weatherData">
    <div class="weather-data-container">
      <div class="weather-data-today">
        <span
          >{{ weatherData[0].datetime }} - {{ weatherData[6].datetime }}</span
        >
        <strong>{{ Math.floor(weatherData[0].temp) }}</strong>
      </div>
    </div>
    <div class="weather-data-container">
      <div
        class="weather-data-for-week"
        v-for="el in getWeatherForWeek"
        :key="el.id"
      >
        <span>{{ convertDateTime(el.datetime) }}</span>
        <strong>{{ Math.floor(el.temp) }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "DisplayWeather",
  props: {
    weatherData: Array,
  },
  computed: {
    getWeatherForWeek() {
      return this.weatherData.filter((el, i) => {
        if (i > 6) {
          return;
        }
        return el;
      });
    },
  },
  methods: {
    convertDateTime(datetime) {
      return moment(datetime).format("dddd");
    },
  },
};
</script>

<style>
.weather-data-container {
  display: flex;
  justify-content: space-around;
  height: 120px;
  margin-bottom: 48px;
}

.weather-data-today,
.weather-data-for-week {
  color: #fff;
  font-weight: 600;
  font-style: normal;
  text-shadow: 0px 0px 9px #08153e66;
}

.weather-data-today {
  font-size: 120px;
}

.weather-data-today span,
.weather-data-for-week span {
  text-transform: uppercase;
  color: #08153e;
  opacity: 0.6;
  font-size: 12px;
  display: block;
}

.weather-data-for-week {
  font-size: 24px;
}

.weather-data-for-week strong::after,
.weather-data-today strong::after {
  content: "\2103";
}
</style>
