<template>
  <div id="player" class="main_padding-b">
    <div class="top">
      <router-link to="/list" class="back">
        <img src="@/assets/img/icon/arrow.svg" alt="">
      </router-link>
      <div class="w1200 txt-center">
        {{ playerData.listName }}
      </div>
      <div class="list_btn txt-white" @click="toggleListLightbox">
        List
      </div>
    </div>
    
    <div class="inner w1200">
      <YtIframe :ytVideoId="ytVideoId"/>
      <!-- <div class="if_box">
        <div id="if_block" ref="ifBlock"></div>
      </div> -->
      <br>
      <!-- <button @click="playVideo">play</button>
      <button @click="pauseVideo">pause</button>
      <button @click="stopVideo">stop</button>
      <button @click="getDuration">getDuration</button>
      <br>
      {{ `currentTime: ${currentTime}` }}
      <br>
      {{ playingState }} -->
    </div>

    <div class="video_set" :class="{active: videoListLightboxOpen}">
      <template v-if="playerData.videoData.length > 0">
        <div class="list">
          <div
            class="item"
            v-for="item in playerData.videoData"
            :key="item.id"
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
      </template>
      <div class="no_video" v-else>
        暫無影片
      </div>
    </div>
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

const ytVideoId = ref()
const videoListLightboxOpen = ref(true)
function videoSelect(videoId) {
  videoListLightboxOpen.value = false
  ytVideoId.value = videoId
  // initYoutubeIFrameAPI(
  //   ifBlock.value.id,
  //   videoId,
  //   (event) => {
  //     console.log('onReady');
  //     playerEvent.value = event
  //     playerStateObj.value = window.YT.PlayerState
  //   },
  //   (event) => {
  //     console.log('onStateChange');
  //     playerEvent.value = event
  //   }
  // )
}
function toggleListLightbox(){
  videoListLightboxOpen.value = !videoListLightboxOpen.value
}


// 取得API資料
const playerData = ref({
  listName: null,
  videoData: []
})
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
