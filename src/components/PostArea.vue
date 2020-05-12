<template>
  <div>
    Post area
    <div>
      <div>
        Name
        <a class="mandatory-mark">*</a>
        <input type="text" v-model="postName" />
      </div>
      <div>
        Genre<a class="mandatory-mark">*</a
        ><label class="genre" v-for="dish in genre" :key="dish">
          <input type="radio" name="genre" :value="dish" v-model="postGenre" />
          {{ dish }}
        </label>
      </div>
      <div>
        Category<a class="mandatory-mark">*</a
        ><label class="category" v-for="dish in category" :key="dish">
          <input
            type="radio"
            name="category"
            :value="dish"
            v-model="postCategory"
          />
          {{ dish }}
        </label>
      </div>
      <div>
        <a v-show="isCompleted">Fill all fields!</a>
      </div>
    </div>
    <div>
      <button type="button" v-on:click="validation">
        Post
      </button>
      <button type="button" v-on:click="clearForm">Clear</button>
    </div>
    <div v-show="postError">
      Error happened! Try again
    </div>
    <div v-show="isPosted">
      <a>Dish is added!</a>
      <div>Name: {{ addedName }}</div>
      <div>Genre: {{ addedGenre }}</div>
      <div>Category: {{ addedCategory }}</div>
      <button type="button" v-on:click="contentConfirm">Got it</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostArea",
  props: ["genre", "category"],
  methods: {
    clearForm() {
      this.postName = "";
      this.postGenre = "";
      this.postCategory = "";
      this.isCompleted = false;
      this.isPosted = false;
      this.postError = false;
    },
    contentConfirm() {
      this.addedName = "";
      this.addedGenre = "";
      this.addedCategory = "";
      this.clearForm();
    },
    sendDataToDB() {
      axios
        .post("/api/dishes", {
          name: this.postName,
          genre: this.postGenre,
          category: this.postCategory,
        })
        .then((res) => {
          this.addedName = JSON.parse(res.config.data).name;
          this.addedGenre = JSON.parse(res.config.data).genre;
          this.addedCategory = JSON.parse(res.config.data).category;
          console.log(JSON.parse(res.config.data).name);
        })
        .then(() => {
          this.isPosted = true;
        })
        .catsh((error) => {
          this.postError = true;
        });
    },
    validation() {
      if (!this.postName || !this.postName || !this.postCategory) {
        this.isCompleted = true;
      } else {
        this.isCompleted = false;
        this.sendDataToDB();
      }
    },
  },
  data() {
    return {
      postName: "",
      postGenre: "",
      postCategory: "",
      isCompleted: false,
      isPosted: false,
      addedName: "",
      addedGenre: "",
      addedCategory: "",
      postError: false,
    };
  },
};
</script>

<style scope>
.mandatory-mark {
  color: red;
}
</style>
