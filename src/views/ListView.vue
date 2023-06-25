<template>
  <div id="lists" class="main_padding">
    <div class="inner w1200">
      <h3 class="txt-center">This is a list page</h3>
      <div class="list_box">
        <template v-for="item in lists" :key="item.id">
          <router-link :to="`/player/${item.id}`" class="list_item">
            {{ item.name }}
          </router-link>
        </template>
      </div>
      <div class="add">
        <input type="text" v-model="newListName">
        <button class="btn" @click="createList">
          Create New List
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
  /* eslint-disable  no-unused-vars */
  import { ref, onBeforeMount } from "vue";
  import axios from "axios";

  const lists = ref();

  async function getLists() {
    lists.value = [];
    await axios.get(`${process.env.VUE_APP_API_KEY}/movie_list`)
      .then((response) => {
        console.log(response)
        lists.value = response.data
      })
      .catch((err)=>{
        console.log(err)
      });
  }

  const newListName = ref();
  async function createList(){
    await axios.post(`${process.env.VUE_APP_API_KEY}/movie_list`, {
      name: newListName.value
    })
      .then((response) => {
        console.log(response)
        getLists();
      })
      .catch((err)=>{
        console.log(err)
      });
  }

  onBeforeMount(() => {
    getLists()
  });
</script>
<style
  scoped
  src="@/assets/scss/lists.scss"
  lang="scss"
>
</style>