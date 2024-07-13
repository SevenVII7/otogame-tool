<template>
  <div
    v-if="bookmarkVideo.length"
    class="bookmark_itembox"
  >
    <template
      v-for="(item, i) in bookmarkVideo"
      :key="i"
    >
      <div class="bookmark_item">
        <small class="txt-dark_gray">{{ item.collectionData.name }}</small>
        <VideoItem
          :pic="item.videoData.pic"
          :name="item.videoData.name"
        />
      </div>
    </template>
  </div>
  <div v-else>
    <noDataHint />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import VideoItem from '@/components/VideoItemComponent.vue'
import noDataHint from '@/components/noDataHint.vue'
import type { YtVideoBookmarks } from '@/types'
const bookmarkVideo = ref<YtVideoBookmarks[]>([
  {
    collectionData: {
      id: 1,
      name: ''
    },
    videoData: {
      id: 1,
      ytId: '',
      pic: 'https://i.ytimg.com/vi/YyV9jowj9PY/sddefault.jpg',
      name: '『glow』3DMVゲームサイズ公開！'
    }
  }
])
</script>
