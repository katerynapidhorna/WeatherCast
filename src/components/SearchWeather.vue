<template>
  <div
    class="wrapper"
    :style="{
      backgroundImage: createBackgroundGradient($store.state.averageTemp),
    }"
  >
    <div class="search-container">
      <form v-on:submit="getWeather">
        <img class="weather-img" src="../img/weather-img.png" alt="" />
        <select
          class="country-code"
          id="country-code"
          v-model="countries.selected"
          v-if="countries.data"
        >
          <option v-for="el in countries.data" :key="el.code" :value="el.code">
            {{ el.emoji }}
            {{ el.code }}
          </option>
        </select>
        <input
          class="text-input"
          type="text"
          placeholder="Please enter your location..."
          ref="search"
          @input="onChange($event)"
        />
        <span class="notification" v-if="isUndefinedMessage">{{
          isUndefinedMessage
        }}</span>
        <button class="submit-btn" v-if="!isLoading"></button>
        <!-- https://ru.vuejs.org/v2/guide/class-and-style.html -->
        <button class="loading-icon" v-if="isLoading"></button>
      </form>
    </div>
    <DisplayWeather :weatherData="weather.data" />
  </div>
</template>

<script>
import axios from "axios";
import DisplayWeather from "./DisplayWeather";
import store from "../store";
import { SELECTED_COUNTRY_CODE } from "../constants";

export default {
  name: "SearchWeather",
  store,
  components: {
    DisplayWeather,
  },
  data() {
    return {
      isLoading: false,
      errors: [],
      countries: {
        data: null,
        selected: SELECTED_COUNTRY_CODE,
      },
      weather: {
        data: null,
        inCity: "Amsterdam",
        isUndefinedMessage: null,
      },
      averageTemp: null,
    };
  },
  methods: {
    //autofocus input
    focusInput() {
      const input = this.$refs.search;
      console.log(input);
      input.focus();
    },
    //request the weather data
    async getWeather(event) {
      event.preventDefault();
      this.isLoading = true;
      try {
        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${this.weather.inCity},${this.countries.selected}&key=1730bfc17d6b4fd7bbaf707b4972dc8d`
        );
        if (response.data.data === undefined) {
          this.isUndefinedMessage =
            "The city name may be incorrect, please try again";
        } else {
          this.isUndefinedMessage = null;
        }
        this.weather.data = response.data.data;
        this.isLoading = false;
      } catch (e) {
        console.log(e);
        this.errors.push(e);
      } finally {
        this.isLoading = false;
      }
    },
    //text input event to save user input value reactively
    onChange(event) {
      this.weather.inCity = event.target.value;
    },
    //dinamic background gradient
    //refuctor later!
    createBackgroundGradient(val) {
      const defaultGradient = `linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.8)
          ),
          linear-gradient(
            119.25deg,
            #102f7e -11.47%,
            #0c8dd6 3.95%,
            #1aa0ec 19.37%,
            #60c6ff 34.78%,
            #9bdbff 50.19%,
            #b4deda 65.61%,
            #ffd66b 81.02%,
            #ffc178 96.44%,
            #fe9255 111.85%
          )`;
      if (val) {
        let calculated = null;
        if (val > -20 && val < 20) {
          calculated = `linear-gradient(130.54deg, #9BDBFF -33.02%, #B4DEDA 52.01%, #FFD66B 137.04%)`;
        } else if (val >= -40 && val <= -20) {
          calculated = `linear-gradient(130.54deg, #102F7E -33.02%, #0C8DD6 52.01%, #1AA0EC 137.04%)`;
        } else if (val >= 20 && val <= 40) {
          calculated = `linear-gradient(130.54deg, #FFD66B -33.02%, #FFC178 52.01%, #FE9255 137.04%)`;
        }
        return calculated;
      } else {
        return defaultGradient;
      }
    },
    async getCountryCodes() {
      try {
        const response = await axios.get(
          `https://unpkg.com/country-flag-emoji-json@1.0.2/json/flag-emojis-by-code.pretty.json`
        );
        this.countries.data = response.data;
      } catch (e) {
        console.log(e);
        this.errors.push(e);
      }
    },
  },
  mounted() {
    this.focusInput();
    this.getCountryCodes();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.search-container {
  width: 632px;
  margin: auto;
  margin-top: 194px;
  min-height: 92px;
}

form {
  position: relative;
  display: flex;
  justify-content: center;
  width: 587px;
  color: #b2b6c3;
  background-color: #f8f8f8;
  padding: 23px;
  border-radius: 17px;
  box-shadow: 1px 3px 24px -13px #08153e;
}

.weather-img {
  width: 43px;
  padding-right: 15px;
  height: 29px;
  padding-left: 3px;
  padding-top: 7px;
}

.submit-btn,
.loading-icon {
  position: absolute;
  right: 36px;
  top: 36px;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  outline: none;
}

.submit-btn {
  height: 27px;
  width: 21px;
  background-image: url("../img/search-icon.png");
  background-position-x: -20px;
  background-size: 41px;
}

.loading-icon {
  height: 21px;
  width: 21px;
  background-image: url("../img/loading-icon.png");
  background-size: 21px;
  background-position-x: 0px;
  animation: rotation 2s linear infinite;
}

@-webkit-keyframes rotation {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.country-code {
  width: 95px;
  margin-right: 5px;
  border-radius: 6px;
  border: 1px solid #b4b8c5;
  font-size: 17px;
  font-weight: 900;
  padding: 12px 11px;
}

.text-input {
  width: 425px;
  padding: 1em 12px;
  border-radius: 6px;
  border: 1px solid #b4b8c5;
  outline: none;
  letter-spacing: 0.08em;
}

.text-input:hover {
  border: 1px solid #b5c7ff;
}

.text-input:focus {
  border: 2px solid #b5c7ff;
}

.text-input:focus + .submit-btn {
  background-position-x: 0;
}

.notification {
  position: absolute;
  top: 110px;
  color: red;
}
</style>
