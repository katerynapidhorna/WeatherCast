<template>
  <div v-if="weatherData">
    <div class="weather-data-container">
      <div class="weather-data-today">
        <span
          >{{ weatherData[0].datetime }} - {{ weatherData[6].datetime }}</span
        >
        <strong>{{ getAverage }}</strong>
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
import store from "../store";

export default {
  name: "DisplayWeather",
  store,
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
    getAverage() {
      //filter first 10 elements
      const arrOfTemps = this.weatherData.filter((el, i) => {
        if (i > 9) {
          return;
        }
        return el;
      });
      //get sum of temperatures
      const total = arrOfTemps.reduce((tempAcc, elem) => {
        return tempAcc + parseInt(elem.temp);
      }, 0);

      const result = Math.floor(total / arrOfTemps.length);
      this.setAverageTemp(result);
      //culculate average number
      //rounding number
      return Math.floor(total / arrOfTemps.length);
    },
  },
  methods: {
    convertDateTime(datetime) {
      return moment(datetime).format("dddd");
    },
    setAverageTemp(val) {
      this.$store.commit("setAverageTemp", val);
      console.log(this.$store.state.averageTemp);
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
