<template>
  <div id="player">
    <div class="top">
      <router-link to="/list" class="back">
        <img src="@/assets/img/icon/arrow.svg" alt="">
      </router-link>
      <div class="w1200 txt-center">
        {{ playerData.listName }}
      </div>
      <div class="top_btns">
        <el-button-group>
          <el-button type="primary" @click="toggleOpenFeatureCover">
            {{ (openFeatureCover) ? '觀看模式' : '遮罩模式' }}
          </el-button>
          <el-button type="primary" v-if="openFeatureCover" @click="toggleOpenFeatureSetting">
            {{ (openFeatureSetting) ? '控制項隱藏' : '控制項開啟' }}
          </el-button>
          <el-button type="primary" @click="toggleListLightbox">
            清單
          </el-button>
        </el-button-group>
      </div>
    </div>
    
    <div class="inner w1200">
      <YtIframe
        :ytVideoId="ytVideoId"
        :openFeatureCover="openFeatureCover"
        :openFeatureSetting="openFeatureSetting"
      />
    </div>

    <div class="video_set" :class="{active: videoListLightboxOpen}">
      <div class="list">
        <div class="add_item" @click="openDialog">
          新增影片
        </div>
        <div
          class="item"
          v-for="item in playerData.videoData"
          :key="item.id"
          :class="{active: (ytVideoId === item.yt_id)}"
          @click="videoSelect(item.yt_id)"
        >
          <div class="pic">
            <figure :style="`background-image: url(${item.pic});`"></figure>
          </div>
          <div class="text">
            <p>
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      class="new_video_dialog"
      title="新增 Youtube 影片"
      v-model="newVideoVisible"
    >
      <div>
        <p class="input_name">Youtube 影片 ID:</p>
        <el-input v-model="newVideoId"></el-input>
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
            @click="createVideo"
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
import { ref, computed, onMounted, defineProps } from "vue";
import YtIframe from '@/components/YtIframe.vue'

const props = defineProps({
  id: String,
})

// 影片清單相關
const newVideoVisible = ref(false);
const newVideoId = ref('');
const videoListLightboxOpen = ref(true)
function toggleListLightbox(){
  videoListLightboxOpen.value = !videoListLightboxOpen.value
}
function openDialog(){
  newVideoVisible.value = true
}
function closeDialog(){
  newVideoVisible.value = false
}
async function createVideo(){
  await axios.post(`${process.env.VUE_APP_API_KEY}/player_info`, {
    ytId: newVideoId.value,
    listId: props.id
  })
    .then((response) => {
      console.log(response)
      newVideoId.value = ''
      closeDialog();
      getPlayerInfo();
    })
    .catch((err)=>{
      console.log(err)
    });
}

// 播放器相關
const ytVideoId = ref()
const playerData = ref({
  listName: null,
  videoData: []
})
const openFeatureCover = ref(false)
const openFeatureSetting = ref(true)
function videoSelect(videoId) {
  videoListLightboxOpen.value = false
  ytVideoId.value = videoId
}
function toggleOpenFeatureCover() {
  openFeatureCover.value = !openFeatureCover.value
  if (openFeatureCover.value) {
    openFeatureSetting.value = true
  }
}
function toggleOpenFeatureSetting() {
  openFeatureSetting.value = !openFeatureSetting.value
}
// 取得API資料
async function getPlayerInfo() {
  await axios.get(`${process.env.VUE_APP_API_KEY}/player_info?id=${props.id}`)
    .then((response) => {
      console.log(response)
      playerData.value.listName = response.data.name
      playerData.value.videoData = response.data.videoData
    })
    .catch((err)=>{
      console.log(err.response)
    });
}

// onMounted
onMounted(() => {
  console.log('onMounted')
  getPlayerInfo();
});
</script>
<style
  scoped
  src="@/assets/scss/player.scss"
  lang="scss"
>
</style>
