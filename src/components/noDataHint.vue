<template>
  <div class="no_data_hint">
    <p class="h5 txt-gray txt-center">
      <slot>暫無資料</slot>
    </p>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.no_data_hint {
  padding: 30px 0;
}
</style>
