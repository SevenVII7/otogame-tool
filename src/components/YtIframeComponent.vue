<template>
  <div id="video_feature">
    <div class="if_box">
      <div
        id="if_block"
        ref="ifBlock"
      ></div>
    </div>
    <div
      class="feature_cover"
      v-show="openFeatureCover"
      :style="{ backgroundColor: `rgba(0,0,0,${coverOpacity / 100})` }"
    >
      <div
        class="cover_feature"
        v-show="openFeatureSetting"
      >
        <small class="tag"> 遮罩不透明度 </small>
        <el-slider v-model="coverOpacity" />
      </div>
      <div
        class="playing_feature"
        v-show="openFeatureSetting"
      >
        <el-button-group>
          <el-button
            type="success"
            :disabled="!ytVideoId"
            @click="playVideo"
          >
            <i class="fas fa-play"></i>
          </el-button>
          <el-button
            type="primary"
            :disabled="!ytVideoId"
            @click="pauseVideo"
          >
            <i class="fas fa-pause"></i>
          </el-button>
          <el-button
            type="primary"
            :disabled="!ytVideoId"
            @click="stopVideo"
          >
            <i class="fas fa-stop"></i>
          </el-button>
        </el-button-group>
      </div>
    </div>
    <!-- <div class="if_box">
      <div id="if_block" ref="ifBlock"></div>
    </div> -->
    <!-- <br> -->
    <!-- <button @click="playVideo">play</button>
    <button @click="pauseVideo">pause</button>
    <button @click="stopVideo">stop</button>
    <button @click="getDuration">getDuration</button>
    <br>
    {{ `currentTime: ${currentTime}` }}
    <br>
    {{ playingState }} -->
  </div>
</template>
<script lang="ts" setup>
/* eslint-disable  no-unused-vars */
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps<{
  ytVideoId: String
  openFeatureCover: Boolean
  openFeatureSetting: Boolean
}>()

const coverOpacity = ref(50)

// YT IFrame 播放器
const ifBlock = ref(null)
const player = ref() // 播放器實體存放處
const playerEvent = ref()
const playerStateObj = ref()
const playingState = computed(function () {
  let returnValue = null
  if (Number.isInteger(playerEvent.value?.data) && playerStateObj.value) {
    const playerArr = Object.entries(playerStateObj.value)
    returnValue = playerArr.find((elem) => elem[1] === playerEvent.value.data)[0]
  }
  return returnValue
})
const currentTime = ref(0)
// 把YT IFrame Api塞到window裡啟動
function initYoutubeIFrameAPI(elem, id, onReadyFn, onStateChangeFn) {
  // 2. This code loads the IFrame Player API code asynchronously.
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(tag, firstScript)

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  window.onYouTubeIframeAPIReady && window.YT
    ? (() => {
        player.value = new window.YT.Player(elem, {
          // videoId: id,
          height: '1080',
          width: '1920',
          playerVars: {
            controls: 1,
            fs: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1
          },
          events: {
            onReady: onReadyFn,
            onStateChange: onStateChangeFn
          }
        })
      })()
    : (window.onYouTubeIframeAPIReady = function () {
        console.log('success')
        player.value = new window.YT.Player(elem, {
          // videoId: id,
          height: '1080',
          width: '1920',
          playerVars: {
            controls: 1,
            fs: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1
          },
          events: {
            onReady: onReadyFn,
            onStateChange: onStateChangeFn
          }
        })
      })
}
function playVideo() {
  player.value.playVideo()
}
function pauseVideo() {
  player.value.pauseVideo()
}
function stopVideo() {
  player.value.stopVideo()
}
function getDuration() {
  currentTime.value = player.value.getCurrentTime()
}
function getVideoById(id) {
  player.value.loadVideoByUrl({
    mediaContentUrl: `http://www.youtube.com/v/${id}?version=3`
  })
}

watch(
  () => props.ytVideoId,
  (newValue, oldValue) => {
    getVideoById(newValue)
    stopVideo()
  }
)

onMounted(() => {
  initYoutubeIFrameAPI(
    ifBlock.value.id,
    'videoId',
    (event) => {
      console.log('onReady')
      playerEvent.value = event
      playerStateObj.value = window.YT.PlayerState
    },
    (event) => {
      console.log('onStateChange')
      playerEvent.value = event
    }
  )
})
</script>
