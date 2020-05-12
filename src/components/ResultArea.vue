<template>
  <div>
    Result area
    <div v-if="result.length > 0">
      <div class="card" v-for="dish in result" :key="dish.id">
        <div class="name">
          {{ dish.name }}
        </div>
        <div class="genre">{{ dish.genre }}</div>
        <div class="category">{{ dish.category }}</div>
      </div>
    </div>
    <div v-else>
      No result
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultArea",
  props: ["result"],
};
</script>

<style scope>
.name {
  font-size: large;
}
</style>
