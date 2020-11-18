<template>
  <div class="search-container">
    <form>
      <img class="weather-img" src="../img/weather-img.png" alt="" />
      <select
        class="country-code"
        id="country-code"
        v-model="counties.selected"
        v-if="counties.data"
      >
        <option v-for="el in counties.data" :key="el.code" :value="el.code">
          {{ el.emoji }}
          {{ el.code }}
        </option>
      </select>
      <div class="img-container"></div>
      <input
        class="text-input"
        type="text"
        placeholder="Please enter your location..."
        @input="onChange($event)"
      />
      {{ getWeather() }}
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchWeather",
  data() {
    return {
      counties: {
        data: null,
        selected: "NL",
      },
      weather: {
        data: null,
        inCountry: null,
        inCity: null,
      },
    };
  },
  methods: {
    getWeather() {
      axios
        .get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=Amsterdam,${this.counties.selected}&key=1730bfc17d6b4fd7bbaf707b4972dc8d`
        )
        .then((response) => {
          this.weather.data = response.data;
          console.log(this.weather.data, "<==weather data");
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    onChange(event) {
      this.weather.inCity = event.target.value;
      console.log(this.weather.inCity);
    },
  },
  mounted() {
    axios
      .get(
        `https://unpkg.com/country-flag-emoji-json@1.0.2/json/flag-emojis-by-code.pretty.json`
      )
      .then((response) => {
        this.counties.data = response.data;
        console.log(this.counties.data, "<==country data");
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

.img-container {
  position: absolute;
  right: 36px;
  top: 28px;
  height: 27px;
  width: 21px;
  background-image: url("../img/search-icon.png");
  background-position-x: -20px;
  background-repeat: no-repeat;
  background-size: 41px;
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
