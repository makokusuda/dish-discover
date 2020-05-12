<template>
  <div>
    <h1>Dish info lookup app</h1>
    <PostArea :genre="this.genre" :category="this.category" />
    <SearchArea
      v-on:filter="updateResults"
      v-on:optionsForPost="updateOptions"
    />
    <ResultArea :result="this.result" />
  </div>
</template>

<script>
import SearchArea from "./components/SearchArea";
import ResultArea from "./components/ResultArea";
import PostArea from "./components/PostArea";

export default {
  name: "App",
  components: {
    SearchArea: SearchArea,
    ResultArea: ResultArea,
    PostArea: PostArea,
  },
  methods: {
    updateResults(data) {
      this.result = data;
    },
    updateOptions(genre, category) {
      this.genre = genre;
      this.category = category;
    },
  },
  data() {
    return {
      result: [],
      genre: [],
      category: [],
    };
  },
};
</script>
