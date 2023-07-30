<template>
  <router-link :to="`/player/${id}`" class="list_item">
    <span v-if="!renameStatus">
      {{ name }}
    </span>
    <el-input
      v-else
      v-model="rename"
      style="margin-right: 30px;"
      @click.prevent="()=>false"
      @blur="handleRename(false)"
      @change="handleRename(false)"
    >
    </el-input>
    <div class="features" @click.prevent="()=>false">
      <el-dropdown
        class="features_btn"
        trigger="click"
      >
        <span class="h6">
          <i class="fas fa-caret-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              @click.prevent="handleRename(true)"
            >
              <i class="fas fa-pen"></i>&nbsp;
              重新命名
            </el-dropdown-item>
            <el-dropdown-item
              @click.prevent="deleteListItem(id)"
            >
              <i class="fas fa-folder-minus"></i>&nbsp;
              刪除
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </router-link>
</template>
<script setup>
  /* eslint-disable  no-unused-vars */
  import { ref, computed, onMounted, defineProps } from "vue";
  import axios from "axios";

  const props = defineProps({
    id: Number,
    name: String,
    fn: Function
  })

  const rename = ref()
  const renameStatus = ref(false)

  async function updateListItem(id){
    console.log(id)
    await axios.patch(`${process.env.VUE_APP_API_KEY}/video_list`, {
      id,
      name: rename.value
    })
      .then((response) => {
        console.log(response)
        props.fn();
      })
      .catch((err)=>{
        console.log(err)
      });
  }
  async function deleteListItem(id){
    await axios.delete(`${process.env.VUE_APP_API_KEY}/video_list`, {
      data: {
        id
      }
    })
      .then((response) => {
        console.log(response)
        props.fn();
      })
      .catch((err)=>{
        console.log(err)
      });
  }
  function handleRename(status) {
    renameStatus.value = status
    if(status){
      rename.value = props.name
    }
    if(!status && rename.value){
      updateListItem(props.id)
    }
  }
</script>