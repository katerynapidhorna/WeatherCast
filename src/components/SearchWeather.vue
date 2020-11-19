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
        <button class="submit-btn"></button>
        <input
          class="text-input"
          type="text"
          placeholder="Please enter your location..."
          @input="onChange($event)"
        />
      </form>
      <DisplayWeather :weatherData="weather.data" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DisplayWeather from "./DisplayWeather";
import store from "../store";

export default {
  name: "SearchWeather",
  store,
  components: {
    DisplayWeather,
  },
  data() {
    return {
      countries: {
        data: null,
        selected: "NL",
      },
      weather: {
        data: null,
        inCity: "Amsterdam",
      },
      averageTemp: null,
    };
  },
  methods: {
    getWeather(event) {
      event.preventDefault();
      axios
        .get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${this.weather.inCity},${this.countries.selected}&key=1730bfc17d6b4fd7bbaf707b4972dc8d`
        )
        .then((response) => {
          this.weather.data = response.data.data;
          console.log(this.weather.data, "<==weather data");
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    //text's input event
    onChange(event) {
      this.weather.inCity = event.target.value;
    },
    //work with background gradient
    createBackgroundGradient(val) {
      let calculated = null;
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
      if (val > -20 && val < 20) {
        calculated = `linear-gradient(130.54deg, #9BDBFF -33.02%, #B4DEDA 52.01%, #FFD66B 137.04%)`;
      } else if ((val > -40 && val < -20) || val === -20 || val === -40) {
        console.log(val);
        calculated = `linear-gradient(130.54deg, #102F7E -33.02%, #0C8DD6 52.01%, #1AA0EC 137.04%)`;
      } else if ((val > 20 && val < 40) || val === 20 || val === 40) {
        calculated = `linear-gradient(130.54deg, #FFD66B -33.02%, #FFC178 52.01%, #FE9255 137.04%)`;
      }
      return val ? calculated : defaultGradient;
    },
  },
  mounted() {
    axios
      .get(
        `https://unpkg.com/country-flag-emoji-json@1.0.2/json/flag-emojis-by-code.pretty.json`
      )
      .then((response) => {
        this.countries.data = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.search-container {
  width: fit-content;
  margin: auto;
  margin-top: 20%;
}

form {
  position: relative;
  display: flex;
  justify-content: center;
  width: fit-content;
  color: #b2b6c3;
  background-color: #f8f8f8;
  padding: 1em;
  border-radius: 12px;
  box-shadow: 1px 3px 24px -13px #08153e;
}

.weather-img {
  width: 49px;
  padding-right: 15px;
  height: 34px;
  padding-left: 10px;
  padding-top: 2px;
}

.submit-btn {
  position: absolute;
  right: 36px;
  top: 28px;
  height: 27px;
  width: 21px;
  background-image: url("../img/search-icon.png");
  background-color: transparent;
  background-position-x: -20px;
  background-repeat: no-repeat;
  background-size: 41px;
  border: none;
  outline: none;
}

.country-code {
  width: 95px;
  margin-right: 5px;
  border-radius: 6px;
  border: 1px solid #b4b8c5;
  font-size: 18px;
  font-weight: 900;
}

.text-input {
  width: 425px;
  padding: 1em 20px;
  border-radius: 6px;
  border: 1px solid #b4b8c5;
  outline: none;
}

.text-input:hover {
  border: 1px solid #b5c7ff;
}

.text-input:focus {
  border: 2px solid #b5c7ff;
}
</style>
