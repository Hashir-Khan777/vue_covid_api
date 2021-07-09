import { createStore } from "vuex";

export default createStore({
  state: {
    covidCases: null,
  },
  mutations: {
    ["GET_COVID_API_REQUEST"](state) {
      state.loading = true;
    },

    ["GET_COVID_API_SUCCESS"](state, action) {
      state.loading = false;
      state.covidCases = action.payload;
    },

    ["GET_COVID_API_FAIL"](state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  actions: {
    async getCovidCases({ commit }) {
      commit({
        type: "GET_COVID_API_REQUEST",
      });
      try {
        const data = await fetch("https://api.covid19api.com/summary", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        const result = await data.json();
        commit({
          type: "GET_COVID_API_SUCCESS",
          payload: result,
        });
      } catch (err) {
        commit({
          type: "GET_COVID_API_FAIL",
          payload: err.message,
        });
      }
    },
  },
});
