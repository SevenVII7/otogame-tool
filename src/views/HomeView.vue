<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div id="if_block" ref="ifBlock"></div>
    <br>
    <button @click="playVideo">play</button>
    <button @click="pauseVideo">pause</button>
    <button @click="stopVideo">stop</button>
    <button @click="getDuration">getDuration</button>
    <br>
    {{ `currentTime: ${currentTime}` }}
    <br>
    {{ videoTitle }}
    <br>
    {{ playingState }}
  </div>
</template>

<script setup>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
import { ref, computed, onMounted } from "vue";


// YT IFrame 播放器
const ifBlock = ref(null)
const videoId = ref()
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
// 把YT IFrame Api塞到window裡啟動
function initYoutubeIFrameAPI(id, onReadyFn, onStateChangeFn) {
  // 2. This code loads the IFrame Player API code asynchronously.
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(tag, firstScript);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads. 
  window.onYouTubeIframeAPIReady = function() {
    console.log('success');
    player.value = new window.YT.Player(ifBlock.value, {
      videoId: id,
      controls: 0,
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
const currentTime = ref(0)
function getDuration() {
  currentTime.value = player.value.getCurrentTime();
}


// 取得影片資料
const videoData = ref()
const videoTitle = computed(
  function() {
    let returnValue = null;
    if (
      videoData.value?.items.length <= 1 &&
      videoData.value?.items[0]?.snippet?.title
    ) {
      returnValue = videoData.value.items[0].snippet.title
    }
    return returnValue
  }
)
async function getVideoData(id) {
  await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.VUE_APP_YT_API_KEY}&part=snippet,contentDetails,statistics,status`
  ).then((response) => {
    videoData.value = response.data
  }).catch((err) => {
    console.log(err)
  })
}


// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref as storageRef, onValue } from "firebase/database";
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "new-test-50777.firebaseapp.com",
  databaseURL: "https://new-test-50777-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "new-test-50777",
  storageBucket: "new-test-50777.appspot.com",
  messagingSenderId: "95976230755",
  appId: "1:95976230755:web:25c061993b518a35bd8d56",
  measurementId: "G-NWK1GFDG4S"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// onMounted
onMounted(() => {
  console.log('onMounted')
  console.log(analytics)
  onValue(storageRef(db, 'videoId'), (snapshot) => {
    console.log('onValue')
    const data = snapshot.val();
    videoId.value = data

    initYoutubeIFrameAPI(
      videoId.value,
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
    getVideoData(videoId.value);
  });
})
  
// export default {
  // name: 'HomeView',
  // components: {
  //   // HelloWorld
  // },
  // data() {
  //   return {
  //     videoId: 'EXppCcc4PwI',
  //     videoTitle: 'qwe',
  //     player: null,
  //     playerEvent: null,
  //     playerStateObj: null,
  //   }
  // },
  // computed: {
  //   playingState() {
  //     let returnValue = null;
  //     if (this.playerEvent?.data && this.playerStateObj) {
  //       const playerArr = Object.entries(this.playerStateObj)

  //       console.log(this.playerEvent.data, playerArr)

  //       returnValue =  playerArr.find((elem) => elem[1] === this.playerEvent.data)[0]

  //       // console.log(returnValue)
  //     }
  //     return returnValue
  //   },
  // },
  // methods: {
  //   // 把YT IFrame Api塞到window裡啟動
  //   initYoutubeIFrameAPI(videoId) {
  //     const vm = this;

  //     // 2. This code loads the IFrame Player API code asynchronously.
  //     const tag = document.createElement('script');
  //     tag.src = 'https://www.youtube.com/iframe_api';
  //     const firstScript = document.getElementsByTagName('script')[0];
  //     firstScript.parentNode.insertBefore(tag, firstScript);

  //     // 3. This function creates an <iframe> (and YouTube player)
  //     //    after the API code downloads. 
  //     // let player; // 這邊我改用Vue的data
  //     window.onYouTubeIframeAPIReady = function() {
  //       console.log('success');
  //       vm.player = new window.YT.Player(vm.$refs.if_block, {
  //         videoId,
  //         events: {
  //           'onReady': (event) => {
  //             console.log('onReady');
  //             vm.playerEvent = event
  //             vm.playerStateObj = window.YT.PlayerState
  //           },
  //           'onStateChange': (event) => {
  //             console.log('onStateChange');
  //             vm.playerEvent = event
  //           }
  //         }
  //       });
  //     }
  //   },
  //   playVideo() {
  //     this.player.playVideo();
  //   },
  //   pauseVideo() {
  //     this.player.pauseVideo();
  //   },
  //   stopVideo() {
  //     this.player.stopVideo();
  //   }
  // },
  // mounted() {
  //   this.initYoutubeIFrameAPI(this.videoId)
  // },
  // created() { }
// }
</script>
