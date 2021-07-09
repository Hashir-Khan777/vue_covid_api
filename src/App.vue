<template>
  <div v-if="covidCases" class="cases">
    <h1>Covid 19 records</h1>
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>
            <h3>Country</h3>
          </td>
          <td>
            <h3>Country code</h3>
          </td>
          <td>
            <h3>Total confirmed</h3>
          </td>
          <td>
            <h3>Total recoverd</h3>
          </td>
          <td>
            <h3>Total deaths</h3>
          </td>
        </tr>
      </thead>
      <tbody v-for="(country, index) in covidCases.Countries" :key="country.ID">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ country.Country }}</td>
          <td>{{ country.CountryCode }}</td>
          <td>{{ country.TotalConfirmed }}</td>
          <td>{{ country.TotalDeaths }}</td>
          <td>{{ country.TotalRecovered }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="loading" class="loading">
    <HelloWorld msg="Loading..." />
  </div>
  <div v-if="error" class="loading">
    <HelloWorld :msg="error" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",

  components: {
    HelloWorld,
  },

  computed: {
    loading() {
      return this.$store.state.loading;
    },
    covidCases() {
      return this.$store.state.covidCases;
    },
    error() {
      return this.$store.state.error;
    },
  },

  methods: {
    getCases() {
      this.$store.dispatch("getCovidCases");
    },
  },

  beforeMount() {
    this.getCases();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

.cases {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

table {
  width: 100%;
  margin: 10px 0;
  border-spacing: 0;
  border-collapse: collapse;
}

thead {
  text-align: center;
}

td {
  border: 1px solid black;
  padding: 10px;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
