<template>
  <div class="collection_item">
    <span v-if="!renameStatus">
      <router-link :to="`/player/${id}`">
        {{ name }}
      </router-link>
    </span>
    <el-input
      v-else
      ref="renameInput"
      v-model="rename"
      class="rename_input"
      style="margin-right: 30px"
      @click.prevent="() => false"
      @blur="handleRename(false)"
      @change="handleRename(false, { id: id, newName: rename })"
    ></el-input>
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
            <el-dropdown-item @click="handleRename(true)">
              <i class="fas fa-pen"></i>
              &nbsp; 重新命名
            </el-dropdown-item>
            <el-dropdown-item @click="deleteCollection(id)">
              <i class="fas fa-folder-minus"></i>
              &nbsp; 刪除
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
/* eslint-disable  no-unused-vars */
import { ref, nextTick } from 'vue'
import { apiUpdateCollection, apiDeleteCollection } from '@/utils/apiHelper'
import { toast } from '@/utils/utils'

const props = defineProps<{
  id: number
  name: string
  reloadListFn: () => void
}>()

const rename = ref('')
const renameStatus = ref(false)
const renameInput = ref<HTMLInputElement>()

async function updateCollection(id: number, name: string) {
  try {
    const res = await apiUpdateCollection({ id, name })
    if (res.data) {
      toast({ msg: '更新成功' })
      props.reloadListFn()
    }
  } catch (err) {
    console.log(err)
    toast({ msg: '更新失敗', type: 'error' })
  }
}
async function deleteCollection(id: number) {
  try {
    const res = await apiDeleteCollection({ id })
    if (res.data) {
      toast({ msg: '刪除成功' })
      props.reloadListFn()
    }
  } catch (err) {
    toast({ msg: '刪除失敗', type: 'error' })
  }
}
async function handleRename(status: boolean, { id, newName }: { id?: number; newName?: string } = {}) {
  rename.value = props.name
  renameStatus.value = status
  if (status) {
    await nextTick()
    setTimeout(() => {
      if (renameInput.value) {
        renameInput.value.focus()
      }
    }, 100)
  }
  if (!status && id && newName) {
    updateCollection(id, newName)
  }
}
</script>
<style scoped lang="scss">
.collection_item {
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  border-radius: 7px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  transition: 0.2s;
  .rename_input {
    display: flex;
    width: 50%;
  }
  .features {
    > .features_btn {
      margin-right: 10px;
      cursor: pointer;
    }
  }
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
}
</style>
