<template>
  <div id="lists" class="main_padding">
    <div class="inner w1200">
      <h3 class="txt-center">This is a list page</h3>
      <div class="list_box">
        <div class="add_item" @click="openDialog">
          <i class="fas fa-plus"></i>&nbsp;
          建立新清單
        </div>
        <template v-for="item in lists" :key="item.id">
          <ListItem
            :id="item.id"
            :name="item.name"
            :fn="getLists"
          />
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
            @click="createListItem"
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
  import ListItem from '@/components/ListItem.vue'

  const newListVisible = ref(false);
  const newListName = ref('');

  function openDialog(){
    newListVisible.value = true
  }
  function closeDialog(){
    newListVisible.value = false
  }
  async function createListItem(){
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

  const lists = ref();
  async function getLists(){
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
