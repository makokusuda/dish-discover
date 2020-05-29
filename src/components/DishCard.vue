<template>
  <div class="card">
    <h3 v-if="!edit" class="name">{{ dish.name }}</h3>
    <input v-else type="text" :placeholder="dish.name" v-model="editName" />
    <div>
      <button type="button" v-on:click="deleteDish(dish.id)" v-show="!edit">delete</button>
      <button type="button" v-on:click="toggleEdit" v-show="!edit">edit</button>
      <button type="button" v-on:click="toggleEdit" v-show="edit">discard changes</button>
      <button type="button" v-on:click="updateDish(dish.id)" v-show="edit">save</button>
    </div>
    <img class="image" src="../../public/ingredients.jpg" />
    <div v-if="edit">
      <label>Genre:</label>
      <select name="genre" id="edit-genre" v-model="editGenre">
        <option v-for="dish in genre" :value="dish" :key="dish">{{ dish }}</option>
      </select>
    </div>
    <div v-else class="genre">Genre: {{ dish.genre }}</div>
    <div v-if="edit">
      <label>Category:</label>
      <select name="category" id="edit-category" v-model="editCategoty">
        <option v-for="dish in category" :value="dish" :key="dish">{{ dish }}</option>
      </select>
    </div>
    <div v-else class="category">Category: {{ dish.category }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DishCard",
  props: ["dish", "genre", "category"],
  data() {
    return {
      edit: false,
      editName: "",
      editGenre: "",
      editCategoty: ""
    };
  },
  methods: {
    updateDish(id) {
      if (!this.editName || !this.editGenre || !this.editCategoty) {
        console.log("error");
      } else {
        axios
          .patch(`/api/dishes/${id}`, {
            name: this.editName,
            genre: this.editGenre,
            category: this.editCategoty
          })
          .then(res => {
            console.log(res.config.data);
            console.log("updated");
          })
          .then(() => {
            this.toggleEdit();
          });
      }
    },
    deleteDish(id) {
      axios
        .delete(`/api/dishes/${id}`)
        .then(() => console.log("deleted"))
        .catch(error => console.log(error));
    },
    toggleEdit() {
      this.edit = !this.edit;
    }
  }
};
</script>