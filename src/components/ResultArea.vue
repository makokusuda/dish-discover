<template>
  <div class="container">
    <div v-if="result.length > 0">
      <DishCard
        :genre="genre"
        :category="category"
        v-for="dish in result"
        :dish="dish"
        :key="dish.id"
        v-on:deleteDish="deleteDish"
      />
    </div>
    <div v-else>No result</div>
  </div>
</template>

<script>
import axios from "axios";
import DishCard from "./DishCard";

export default {
  name: "ResultArea",
  components: {
    DishCard: DishCard
  },
  props: ["result", "genre", "category"],
  methods: {
    deleteDish(id) {
      axios
        .delete(`/api/dishes/${id}`)
        .then(() => console.log("deleted"))
        .catch(error => console.log(error));
    },
    updateDish() {
      this.$emit("updateDish");
    }
  }
};
</script>

<style scope>
.container {
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.card {
  margin: 0 auto;
  float: left;
  width: 40%;
  text-align: center;
  margin: 1rem;
  border: 1px solid gray;
}
.genre {
  color: gray;
}
.category {
  color: gray;
}
.image {
  width: 80%;
  height: auto;
}
</style>
