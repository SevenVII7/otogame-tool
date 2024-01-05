<template>
  <div id="player">
    <div class="top">
      <router-link
        :to="{ name: 'Home' }"
        class="back"
      >
        <i class="fas fa-arrow-right"></i>
        <!-- <img src="@/assets/img/icon/arrow.svg" alt=""> -->
      </router-link>
      <div class="w1200 txt-center">
        {{ playerData.listName }}
      </div>
      <div class="top_btns">
        <el-button-group>
          <el-button
            type="primary"
            @click="toggleOpenFeatureCover"
          >
            {{ openFeatureCover ? '觀看模式' : '遮罩模式' }}
          </el-button>
          <el-button
            type="primary"
            v-if="openFeatureCover"
            @click="toggleOpenFeatureSetting"
          >
            {{ openFeatureSetting ? '控制項隱藏' : '控制項開啟' }}
          </el-button>
          <el-button
            type="primary"
            @click="toggleListLightbox"
          >
            <i class="fas fa-list"></i>
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

    <div
      class="video_set"
      :class="{ active: videoListLightboxOpen }"
    >
      <div class="list">
        <div class="list_item">
          <div
            class="add_item"
            @click="openDialog"
          >
            <i class="fas fa-plus"></i>&nbsp; 新增影片
          </div>
        </div>
        <div
          class="list_item"
          v-for="item in playerData.videoData"
          :key="item.id"
        >
          <VideoItem
            :pic="item.pic"
            :name="item.name"
            :class="{ active: ytVideoId === item.yt_id }"
            @videoItemClick="videoSelect(item.yt_id)"
            @deleteVideoItem="deleteVideo(item.id)"
          />
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

<script lang="ts" setup>
/* eslint-disable  no-unused-vars */
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { apiCreateVideo } from '@/utils/apiHelper'
import { toast } from '@/utils/utils'
import YtIframe from '@/components/YtIframeComponent.vue'
import VideoItem from '@/components/VideoItemComponent.vue'

const props = defineProps<{
  id: String
}>()

// 影片清單相關
const newVideoVisible = ref(false)
const newVideoId = ref('')
const videoListLightboxOpen = ref(true)
function toggleListLightbox() {
  videoListLightboxOpen.value = !videoListLightboxOpen.value
}
function openDialog() {
  newVideoVisible.value = true
}
function closeDialog() {
  newVideoVisible.value = false
}
async function createVideo() {
  if (newVideoId.value.length > 11) {
    const result = newVideoId.value.match(/(?<=\?v=).*?(?=&)/)
    if (result) {
      newVideoId.value = result[0] // 輸出：fKRIhvOghyU
    }
  }

  try {
    const res = await apiCreateVideo({
      ytId: newVideoId.value,
      listId: props.id
    })
    if (res.data && res.status >= 200 && res.status < 400) {
      toast({ msg: '影片建立成功' })
      newVideoId.value = ''
      closeDialog()
      getPlayerInfo()
    } else {
      toast({ msg: '影片建立失敗', type: 'error' })
      closeDialog()
    }
  } catch (err) {
    toast({ msg: '影片建立失敗', type: 'error' })
    closeDialog()
  }
}
function deleteVideo() {
  console.log('deleteVideo')
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
  await axios
    .get(`${import.meta.env.VUE_APP_API_KEY}/player_info?id=${props.id}`)
    .then((response) => {
      console.log(response)
      playerData.value.listName = response.data.name
      playerData.value.videoData = response.data.videoData
    })
    .catch((err) => {
      console.log(err.response)
    })
}

// onMounted
onMounted(() => {
  console.log('onMounted')
  getPlayerInfo()
})
</script>
<style scoped lang="scss" src="@/assets/scss/page/player.scss"></style>
