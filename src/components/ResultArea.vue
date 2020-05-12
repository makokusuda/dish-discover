<template>
  <div class="container">
    <div v-if="result.length > 0">
      <div class="card" v-for="dish in result" :key="dish.id">
        <h3 class="name">{{ dish.name }}</h3>
        <img class="image" src="../../public/ingredients.jpg" />
        <div class="genre">Genre: {{ dish.genre }}</div>
        <div class="category">Category: {{ dish.category }}</div>
      </div>
    </div>
    <div v-else>No result</div>
  </div>
</template>

<script>
export default {
  name: "ResultArea",
  props: ["result"]
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
