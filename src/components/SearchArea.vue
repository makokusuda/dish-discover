<template>
  <div>
    Search area
    <div>
      Name:
      <input type="text" v-model="selectedName" />
    </div>
    <div>
      Genre:
      <label class="genre" v-for="dish in genre" :key="dish">
        <input type="checkbox" :value="dish" v-model="selectedGenre" />
        {{ dish }}
      </label>
    </div>
    <div>
      Category:
      <label class="category" v-for="dish in category" :key="dish">
        <input type="checkbox" :value="dish" v-model="selectedCategory" />
        {{ dish }}
      </label>
    </div>
    <div>
      <button type="button" v-on:click="$emit('filter', result)">
        Search
      </button>
      <button type="button" v-on:click="clearFilter">Clear</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchArea",
  async mounted() {
    const { data } = await axios.get("/api/dishes");

    this.dishes = data.slice().reverse();
    this.$emit("filter", this.dishes);

    this.genre = this.checkboxOption("genre");
    this.category = this.checkboxOption("category");
    this.$emit("optionsForPost", this.genre, this.category);
  },
  methods: {
    checkboxOption(value) {
      return this.dishes
        .map((dish) => dish[value])
        .reduce((accumurator, current) => {
          if (!accumurator.includes(current)) {
            accumurator.push(current);
          }
          return accumurator;
        }, []);
    },
    clearFilter() {
      this.selectedCategory = [];
      this.selectedGenre = [];
      this.selectedName = "";
      this.$emit("filter", this.dishes);
    },
  },
  computed: {
    result() {
      let result = this.dishes;

      const filterDishes = (selectedColumn, column) => {
        result = result.filter((value) =>
          selectedColumn.includes(value[column])
        );
      };

      if (this.selectedGenre.length > 0) {
        filterDishes(this.selectedGenre, "genre");
      }

      if (this.selectedCategory.length > 0) {
        filterDishes(this.selectedCategory, "category");
      }

      if (this.selectedName) {
        filterDishes(this.selectedName, "name");
      }
      return result;
    },
  },
  data() {
    return {
      dishes: [],
      genre: [],
      category: [],
      selectedName: "",
      selectedGenre: [],
      selectedCategory: [],
    };
  },
};
</script>
