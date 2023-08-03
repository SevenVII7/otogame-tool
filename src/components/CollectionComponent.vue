<template>
  <div class="collection_item"> 
    <span
      v-if="!renameStatus"
    >
      <router-link :to="`/player/${id}`">
        {{ name }}
      </router-link>
    </span>
    <el-input
      v-else
      class="rename_input"
      ref="renameInput"
      v-model="rename"
      style="margin-right: 30px;"
      @click.prevent="()=>false"
      @blur="handleRename(false)"
      @change="handleRename(false, {id: id, newName: rename})"
    >
    </el-input>
    <div class="features">
      <router-link
        class="features_btn"
        :to="`/player/${id}`"
      >
        <span class="h6">
          <i class="far fa-play-circle"></i>
        </span>
      </router-link>
      <el-dropdown
        class="features_btn"
        trigger="click"
      >
        <span class="h6">
          <i class="fas fa-sliders-h"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              @click="handleRename(true)"
            >
              <i class="fas fa-pen"></i>&nbsp;
              重新命名
            </el-dropdown-item>
            <el-dropdown-item
              @click="deleteCollection(id)"
            >
              <i class="fas fa-folder-minus"></i>&nbsp;
              刪除
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
  /* eslint-disable  no-unused-vars */
  import { ref, computed, onMounted, defineProps, nextTick } from "vue";
  import { apiUpdateCollection } from '@/utils/apiHelper'
  import { toast } from '@/utils/utils'
  import axios from "axios";

  const props = defineProps({
    id: Number,
    name: String,
    reloadListFn: Function
  })

  const rename = ref()
  const renameStatus = ref(false)
  const renameInput = ref(null)

  async function updateCollection(id, name){
    console.log(id, rename.value)
    try {
      const res = await apiUpdateCollection({ id, name })
      if (res.data) {
        toast({msg: '更新成功'})
        props.reloadListFn()
      } 
    } catch (err) {
      console.log(err)
      toast({msg: '更新失敗', type: 'error'});
    }
  }
  async function deleteCollection(id){
    await axios.delete(`${process.env.VUE_APP_API_KEY}/video_list`, {
      data: {
        id
      }
    })
      .then((response) => {
        console.log(response)
        toast({msg: '刪除成功'})
        props.reloadListFn()
      })
      .catch((err)=>{
        console.log(err)
        toast({msg: '刪除失敗', type: 'error'})
      });
  }
  async function handleRename(status, { id, newName } = {}) {
    rename.value = props.name
    renameStatus.value = status
    if (status) {
      await nextTick()
      renameInput.value.focus()
    }
    if (!status && id && newName) {
      updateCollection(id, newName)
    }
  }
</script>
<style scoped lang="scss">
.collection_item{
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  border-radius: 7px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0,0,0,.15);
  transition: .2s;
  .rename_input{
    display: flex;
    width: 50%;
  }
  .features{
    >.features_btn {
      margin-right: 10px;
      cursor: pointer;
    }
  }
  &:hover{
    transform: scale(1.01);
    box-shadow: 0 0 10px rgba(0,0,0,.25);
  }
}
</style>