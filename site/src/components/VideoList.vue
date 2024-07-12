<template>
  <div
    class="video_set"
    :class="{ active: props.videoListLightboxOpen }"
  >
    <div class="list">
      <div class="list_item">
        <div
          class="add_item"
          @click="openDialog"
        >
          <i class="fas fa-plus"></i>
          &nbsp; 新增影片
        </div>
      </div>
      <div
        v-for="item in playerData.videoData"
        :key="item.id"
        class="list_item"
      >
        <VideoItem
          :pic="item.pic"
          :name="item.name"
          :class="{ active: ytVideoId === item.ytId }"
          @video-item-click="videoSelect(item.ytId)"
          @delete-video-item="deleteVideo(item.id)"
        />
      </div>
    </div>
    <el-dialog
      v-model="newVideoVisible"
      class="new_video_dialog"
      title="新增 Youtube 影片"
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
import { ref, onMounted } from 'vue'
import { apiCreateVideo } from '@/utils/apiHelper'
import { toast } from '@/utils/utils'
import VideoItem from '@/components/VideoItemComponent.vue'
import type { YtVideoType } from '@/types'

const props = withDefaults(
  defineProps<{
    id: number
    videoListLightboxOpen: boolean
  }>(),
  {
    videoListLightboxOpen: false
  }
)
const emits = defineEmits<{
  videoSelect: [ytId: string]
}>()

// 影片清單相關
const newVideoVisible = ref(false)
const newVideoId = ref('')

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
      collectionId: props.id
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
function deleteVideo(videoId: number) {
  console.log(`deleteVideo: ${videoId}`)
}

// 播放器相關
const ytVideoId = ref('')
const playerData = ref<{ listName: string | null; videoData: YtVideoType[] }>({
  listName: null,
  videoData: []
})
function videoSelect(ytId: string) {
  emits('videoSelect', { ytId })
  // videoListLightboxOpen.value = false
  // ytVideoId.value = ytId
}
// 取得API資料
async function getPlayerInfo() {
  await axios
    .get(`${import.meta.env.VITE_API_KEY}/player_info?id=${props.id}`)
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
