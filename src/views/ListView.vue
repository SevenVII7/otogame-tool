<template>
  <div id="lists" class="main_padding">
    <div class="inner w1200">
      <h3 class="txt-center">This is a list page</h3>
      <div class="list_box">
        <div class="add_item" @click="openDialog">
          Create New List
        </div>
        <template v-for="item in lists" :key="item.id">
          <div class="list_item">
            <router-link :to="`/player/${item.id}`">
              {{ item.name }}
            </router-link>
            <div class="features">
              <el-button type="danger" plain @click="deleteList(item.id)">
                刪除
              </el-button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <el-dialog
      class="new_name_dialog"
      title="新增清單"
      v-model="newListVisible"
    >
      <div>
        <p class="input_name">清單名稱:</p>
        <el-input v-model="newListName"></el-input>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="info"
            plain
            @click="closeDialog"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            @click="createList"
          >
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
  /* eslint-disable  no-unused-vars */
  import { ref, onBeforeMount } from "vue";
  import axios from "axios";

  const newListVisible = ref(false);
  const newListName = ref('');
  function openDialog(){
    newListVisible.value = true
  }
  function closeDialog(){
    newListVisible.value = false
  }
  async function createList(){
    await axios.post(`${process.env.VUE_APP_API_KEY}/video_list`, {
      name: newListName.value
    })
      .then((response) => {
        console.log(response)
        newListName.value = ''
        closeDialog();
        getLists();
      })
      .catch((err)=>{
        console.log(err)
      });
  }
  async function deleteList(id){
    await axios.delete(`${process.env.VUE_APP_API_KEY}/video_list`, {
      data: {
        id
      }
    })
      .then((response) => {
        console.log(response)
        getLists();
      })
      .catch((err)=>{
        console.log(err)
      });
  }

  const lists = ref();
  async function getLists() {
    lists.value = [];
    await axios.get(`${process.env.VUE_APP_API_KEY}/video_list`)
      .then((response) => {
        console.log(response)
        lists.value = response.data
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