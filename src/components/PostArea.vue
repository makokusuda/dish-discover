<template>
  <div class="post-area">
    <a class="area-title">Post new dish</a>
    <div>
      <div>
        Name
        <a class="mandatory-mark">*</a>
        <input class="name-input" type="text" v-model="postName" />
      </div>
      <div>
        Genre
        <a class="mandatory-mark">*</a>
        <label class="genre" v-for="dish in genre" :key="dish">
          <input type="radio" name="genre" :value="dish" v-model="postGenre" />
          {{ dish }}
        </label>
      </div>
      <div>
        Category
        <a class="mandatory-mark">*</a>
        <label class="category" v-for="dish in category" :key="dish">
          <input type="radio" name="category" :value="dish" v-model="postCategory" />
          {{ dish }}
        </label>
      </div>
      <div>
        <a v-show="isCompleted">Error - Fill all fields!</a>
      </div>
    </div>
    <div>
      <button class="button-post" type="button" v-on:click="validation">Post</button>
      <button class="button-post" type="button" v-on:click="clearForm">Clear</button>
    </div>
    <div v-show="postError">Error happened! Try again</div>
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
          category: this.postCategory
        })
        .then(res => {
          this.addedName = JSON.parse(res.config.data).name;
          this.addedGenre = JSON.parse(res.config.data).genre;
          this.addedCategory = JSON.parse(res.config.data).category;
        })
        .then(() => {
          this.isPosted = true;
        })
        // .then(() => {
        //   this.$emit("reload");
        // })
        .catsh(error => {
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
    }
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
      postError: false
    };
  }
};
</script>

<style scope>
.mandatory-mark {
  color: red;
}
.post-area {
  width: 84%;
  padding: 0.5em 1em;
  margin: 2em 0;
  color: #5d627b;
  background: white;
  border-top: solid 5px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
}
.post-area div {
  margin: 0;
  padding: 0;
}
.area-title {
  font-weight: bold;
  font-size: large;
}
.button-post {
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
.button-post:hover {
  background: #5d627b;
  color: white;
}
.name-input {
  outline: none;
}
</style>
