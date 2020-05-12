<template>
  <div class="search-area">
    <a class="area-title">Search</a>
    <div>
      Name:
      <input class="name-input" type="text" v-model="selectedName" />
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
      <button class="button-search" type="button" v-on:click="$emit('filter', result)">Search</button>
      <button class="button-search" type="button" v-on:click="clearFilter">Clear</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchArea",
  mounted() {
    this.getDataFromDB();
  },
  methods: {
    async getDataFromDB() {
      const { data } = await axios.get("/api/dishes");

      this.dishes = data.slice().reverse();
      this.$emit("filter", this.dishes);

      this.genre = this.checkboxOption("genre");
      this.category = this.checkboxOption("category");
      this.$emit("optionsForPost", this.genre, this.category);
    },
    checkboxOption(value) {
      return this.dishes
        .map(dish => dish[value])
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
    }
  },
  computed: {
    result() {
      let result = this.dishes;

      const filterDishes = (selectedColumn, column) => {
        result = result.filter(value => selectedColumn.includes(value[column]));
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
    }
  },
  data() {
    return {
      dishes: [],
      genre: [],
      category: [],
      selectedName: "",
      selectedGenre: [],
      selectedCategory: []
    };
  }
};
</script>

<style scope>
.search-area {
  width: 84%;
  padding: 0.5em 1em;
  margin: 2em 0;
  color: #5d627b;
  background: white;
  border-top: solid 5px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
}
.area-title {
  font-weight: bold;
  font-size: large;
}
.button-search {
  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #5d627b;
  border: solid 2px #5d627b;
  border-radius: 3px;
  transition: 0.4s;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  padding-left: 8px;
  padding-right: 8px;
  outline: none;
}
.button-search:hover {
  background: #5d627b;
  color: white;
}
.name-input {
  outline: none;
}
</style>