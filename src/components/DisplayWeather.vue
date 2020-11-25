<template>
  <div v-if="weatherData">
    <div class="weather-data-container-first">
      <div class="weather-data-average">
        <span>
          {{ formatHeadline(weatherData[0].datetime, weatherData[6].datetime) }}
        </span>
        <strong>{{ getAverage }}<sup>&#8451;</sup></strong>
      </div>
    </div>
    <div class="weather-data-container-second">
      <div
        class="weather-data-for-week"
        v-for="el in getWeatherForWeek"
        :key="el.id"
      >
        <div>
          <span>{{ formatDateTime(el.datetime) }}</span>
          <strong>{{ Math.floor(el.temp) }}<sup>&#8451;</sup></strong>
        </div>
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
        return i > 6;
        //   if (i > 6) {
        //     return;
        //   }
        //   return el;
      });
    },
    getAverage() {
      //filter first 10 elements
      const arrOfTemps = this.weatherData.filter((el, i) => {
        return i > 9;
        // if (i > 9) {
        //   return;
        // }
        // return el;
      });
      //get sum of temperatures
      const total = arrOfTemps.reduce((tempAcc, elem) => {
        return tempAcc + parseInt(elem.temp); // parseFloat
      }, 0);

      //culculate average number
      //rounding number
      const result = Math.floor(total / arrOfTemps.length);
      this.setAverageTemp(result);
      return result;
    },
  },
  methods: {
    formatDateTime(datetimeOne) {
      return moment(datetimeOne).format("dddd");
    },
    //NOVEMBER 19 - 25 2020
    formatHeadline(datetimeOne, datetimeTwo) {
      const fromDate = moment(datetimeOne).format("MMMM D");
      const toDate = moment(datetimeTwo).format("D YYYY");
      return `${fromDate} - ${toDate}`;
    },
    setAverageTemp(val) {
      this.$store.commit("setAverageTemp", val);
    },
  },
};
</script>

<style>
.weather-data-container-first {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: fit-content;
  width: 632px;
  margin: 0 auto;
  margin-bottom: 31px;
}

.weather-data-container-second {
  display: flex;
  justify-content: space-between;
  height: fit-content;
  width: 632px;
  margin: 0 auto;
  margin-bottom: 31px;
}

.weather-data-average,
.weather-data-for-week {
  color: #fff;
  font-weight: 600;
  font-style: normal;
  text-shadow: 0px 0px 9px #08153e66;
}

.weather-data-average {
  font-size: 109px;
  display: flex;
  flex-direction: column;
}

.weather-data-average span,
.weather-data-for-week span {
  text-transform: uppercase;
  color: #08153e;
  opacity: 0.6;
  font-size: 12px;
  letter-spacing: 0.06em;
  display: block;
}

.weather-data-average span {
  margin-top: 48px;
  line-height: 24px;
}

.weather-data-average strong,
.weather-data-for-week strong {
  position: relative;
}

.weather-data-average strong sup {
  position: absolute;
  font-size: 24px;
  top: 27px;
  right: -8px;
}

.weather-data-for-week strong {
  margin-right: 18px;
}

.weather-data-for-week strong sup {
  position: absolute;
  top: 3px;
  font-size: 14px;
}

.weather-data-for-week {
  font-size: 24px;
  display: flex;
  justify-content: space-between;
}

/* .weather-data-average strong::after {
  content: "\2103";
} */
</style>
