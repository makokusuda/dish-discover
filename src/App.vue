<template>
  <div>
    <h1>Dish info lookup app</h1>
    <SearchArea v-on:filter="updateResults" />
    <ResultArea :result="this.result" />
  </div>
</template>

<script>
import SearchArea from "./components/SearchArea";
import ResultArea from "./components/ResultArea";
export default {
  name: "App",
  components: {
    SearchArea: SearchArea,
    ResultArea: ResultArea,
  },
  methods: {
    updateResults(data) {
      this.result = data;
    },
  },
  data() {
    return {
      result: [],
    };
  },
};
</script>
