<template>
  <div
    id="home"
    class="main_padding"
  >
    <div class="inner w1200">
      <div class="bookmark_box">
        <h5 class="title txt-bold txt-dark_prime">書籤</h5>
        <VideoBookmarks />
      </div>
      <div class="current_box">
        <h5 class="title txt-bold txt-dark_prime">最近活動</h5>
        <noDataHint />
      </div>
      <div class="list_box">
        <h5 class="title txt-bold txt-dark_prime">合輯</h5>
        <CollectionList />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import VideoBookmarks from '@/components/VideoBookmarks.vue'
import CollectionList from '@/components/CollectionList.vue'
import noDataHint from '@/components/noDataHint.vue'
</script>
