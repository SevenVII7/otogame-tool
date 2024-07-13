<template>
  <div
    v-if="collectionLists.length < maxCollection"
    class="add_item"
    @click="openCreateCollectionDialog"
  >
    <i class="fas fa-plus"></i>
    &nbsp; 建立新合輯 ({{ collectionLists.length }}/{{ maxCollection }})
  </div>
  <template
    v-for="item in collectionLists"
    :key="item.id"
  >
    <CollectionItem
      :id="item.id"
      :name="item.name"
      :reload-list-fn="getCollectionList"
    />
  </template>

  <el-dialog
    v-model="createCollectionDialogVisible"
    class="new_name_dialog"
    title="新增合輯"
  >
    <div>
      <p class="input_name">合輯名稱:</p>
      <el-input v-model="createCollectionName"></el-input>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="info"
          plain
          @click="closeCreateCollectionDialog"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click="createCollection"
        >
          新增
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
/* eslint-disable  no-unused-vars */
import { ref, onBeforeMount } from 'vue'
import { apiGetCollectionList, apiCreateCollection } from '@/utils/apiHelper'
import { toast } from '@/utils/utils'
import CollectionItem from '@/components/CollectionItem.vue'
import type { CollectionListType } from '@/types'

const maxCollection = ref(5)
const collectionLists = ref<CollectionListType>([])
const createCollectionDialogVisible = ref(false)
const createCollectionName = ref('')

function openCreateCollectionDialog() {
  createCollectionDialogVisible.value = true
}
function closeCreateCollectionDialog() {
  createCollectionDialogVisible.value = false
}
async function getCollectionList() {
  try {
    const res = await apiGetCollectionList()
    collectionLists.value = []
    if (res.data && res.status >= 200 && res.status < 400) {
      collectionLists.value = res.data
    } else {
      toast({ msg: '無法取得清單', type: 'error' })
    }
  } catch (err) {
    collectionLists.value = []
    toast({ msg: '無法取得清單', type: 'error' })
  }
}
async function createCollection() {
  if (collectionLists.value.length < maxCollection.value) {
    try {
      const res = await apiCreateCollection({ name: createCollectionName.value })
      if (res.data && res.status >= 200 && res.status < 400) {
        createCollectionName.value = ''
        closeCreateCollectionDialog()
        toast({ msg: '建立成功' })
        getCollectionList()
      } else {
        toast({ msg: '建立失敗', type: 'error' })
      }
    } catch (err) {
      toast({ msg: '建立失敗', type: 'error' })
    }
  }
}

onBeforeMount(() => {
  getCollectionList()
})
</script>
