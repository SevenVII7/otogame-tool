<template>
  <div>
    <div class="if_box">
      <div id="if_block" ref="ifBlock"></div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable  no-unused-vars */
import { ref, computed, onMounted, defineProps, watch } from "vue";

const props = defineProps({
  ytVideoId: String,
})

// YT IFrame 播放器
const ifBlock = ref(null)
const player = ref()
const playerEvent = ref()
const playerStateObj = ref()
const playingState = computed(
  function() {
    let returnValue = null;
    if (Number.isInteger(playerEvent.value?.data) && playerStateObj.value) {
      const playerArr = Object.entries(playerStateObj.value)
      returnValue =  playerArr.find((elem) => elem[1] === playerEvent.value.data)[0]
    }
    return returnValue
  },
)
const currentTime = ref(0)
// 把YT IFrame Api塞到window裡啟動
function initYoutubeIFrameAPI(elem, id, onReadyFn, onStateChangeFn) {
  // 2. This code loads the IFrame Player API code asynchronously.
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(tag, firstScript);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads. 
  window.onYouTubeIframeAPIReady
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
            playsinline: 1,
          },
          events: {
            'onReady': onReadyFn,
            'onStateChange': onStateChangeFn
          }
        })
      })()
    : window.onYouTubeIframeAPIReady = function() {
      console.log('success');
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
          playsinline: 1,
        },
        events: {
          'onReady': onReadyFn,
          'onStateChange': onStateChangeFn
        }
      })
    }
}
function playVideo() {
  player.value.playVideo();
}
function pauseVideo() {
  player.value.pauseVideo();
}
function stopVideo() {
  player.value.stopVideo();
}
function getDuration() {
  currentTime.value = player.value.getCurrentTime();
}
function getVideoById(id) {
  player.value.loadVideoByUrl({
    mediaContentUrl: `http://www.youtube.com/v/${id}?version=3`
  });
}

watch(() => props.ytVideoId, (newValue, oldValue)=>{
  getVideoById(newValue)
  stopVideo();
})

onMounted(()=>{
  initYoutubeIFrameAPI(
    ifBlock.value.id,
    'videoId',
    (event) => {
      console.log('onReady');
      playerEvent.value = event
      playerStateObj.value = window.YT.PlayerState
    },
    (event) => {
      console.log('onStateChange');
      playerEvent.value = event
    }
  )
});

</script>