<template>
  <div class="search-container">
    <form>
      <select name="country-code" id="country-code"></select>
      <div class="img-container"></div>
      <input
        class="text-input"
        type="text"
        placeholder="Please enter your location..."
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchWeather",
  props: {
    msg: String,
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
  margin-top: 25%;
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
  filter: drop-shadow(0px 2px 10px #08153e);
}

form .img-container {
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

.text-input {
  width: 425px;
  padding: 1em 20px;
  border-radius: 6px;
  border: 1px solid #b4b8c5;
}

.text-input:hover {
  border: 1px solid #b5c7ff;
}

.text-input:active {
  border: 2px solid #b5c7ff;
}

.text-input:active .img-container {
  background-position-x: 0px;
}
</style>
