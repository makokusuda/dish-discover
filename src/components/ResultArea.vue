<template>
  <div>
    Result area
    <div>
      <div v-for="dish in result" :key="dish.id">
        {{ dish.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultArea",
  props: ["result"],
};
</script>
