<template>
  <div id="home" class="main_padding">
    <div class="inner w1200">
      <div class="bookmark_box">
        <h5 class="title txt-bold txt-dark_prime">書籤</h5>
        <div class="bookmark_itembox">
          <template v-for="i in 3"  :key="i">
            <div class="bookmark_item">
              <small class="txt-dark_gray">
                合輯名稱
              </small>
              <VideoItem
                :pic="'https://i.ytimg.com/vi/YyV9jowj9PY/sddefault.jpg'"
                :name="'『glow』3DMVゲームサイズ公開！'"
              />
            </div>
          </template>
        </div>
      </div>
      <div class="current_box">
        <h5 class="title txt-bold txt-dark_prime">最近活動</h5>
        <template v-for="item in CollectionLists" :key="item.id">
          <Collection
            :id="item.id"
            :name="item.name"
            :reloadListFn="getCollectionList"
          />
        </template>
      </div>
      <div class="list_box">
        <h5 class="title txt-bold txt-dark_prime">合輯</h5>
        <div class="add_item" v-if="CollectionLists.length < maxCollection" @click="openDialog">
          <i class="fas fa-plus"></i>&nbsp;
          建立新合輯 ({{ CollectionLists.length }}/{{ maxCollection }})
        </div>
        <template v-for="item in CollectionLists" :key="item.id">
          <Collection
            :id="item.id"
            :name="item.name"
            :reloadListFn="getCollectionList"
          />
        </template>
      </div>
    </div>

    <el-dialog
      class="new_name_dialog"
      title="新增合輯"
      v-model="newListVisible"
    >
      <div>
        <p class="input_name">合輯名稱:</p>
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
            @click="createCollection"
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
  import { apiGetCollectionList, apiCreateCollection } from '@/utils/apiHelper'
  import { toast } from '@/utils/utils'
  import Collection from '@/components/CollectionComponent.vue'
  import VideoItem from '@/components/VideoItemComponent.vue'


  const maxCollection = ref(5)
  const CollectionLists = ref([]);
  const newListVisible = ref(false);
  const newListName = ref('');

  function openDialog(){
    newListVisible.value = true
  }
  function closeDialog(){
    newListVisible.value = false
  }
  async function createCollection(){
    if (CollectionLists.value.length < maxCollection.value) {
      try {
        const res = await apiCreateCollection({ name: newListName.value })
        if (res.data) {
          newListName.value = ''
          closeDialog();
          toast({msg: '建立成功'});
          getCollectionList();
        } 
      } catch (err) {
        console.log(err)
        toast({msg: '建立失敗'});
      }
    }
  }
  async function getCollectionList(){
    try {
      const res = await apiGetCollectionList()
      CollectionLists.value = [];
      if (res.data) {
        CollectionLists.value = res.data
      } 
    } catch (err) {
      console.log(err)
      CollectionLists.value = [];
      toast({msg: '無法取得清單', type: 'error'});
    }
  }

  onBeforeMount(() => {
    getCollectionList()
  });
</script>
<style
  scoped
  src="@/assets/scss/home.scss"
  lang="scss"
>
</style>
