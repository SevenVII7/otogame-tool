<template>
  <div class="video_item">
    <div
      class="pic"
      @click="handleClick"
    >
      <figure :style="`background-image: url(${props.pic});`"></figure>
    </div>
    <div
      class="text"
      @click="handleClick"
    >
      <p>
        {{ props.name }}
      </p>
    </div>
    <div
      class="features"
      v-if="editPermission"
    >
      <span @click="handleDelete">
        <i class="fas fa-trash"></i>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  name: String
  pic: String
  editPermission: Boolean
}>()
const emits = defineEmits(['videoItemClick', 'deleteVideoItem'])

function handleClick() {
  emits('videoItemClick')
}
function handleDelete() {
  emits('deleteVideoItem')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/helper/_variable.scss';
.video_item {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s;
  .pic {
    width: 100%;
    background-color: #ccc;
    figure {
      width: 100%;
      padding-bottom: 56%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      transition: 0.2s;
    }
  }
  .text {
    width: 100%;
    padding: 10px;
    p {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .features {
    width: 100%;
    margin: 10px;
    margin-top: 0;
    padding-top: 10px;
    border-top: 1px solid $color-gray;
    text-align: right;
  }
  &::after {
    content: '';
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border: 2px solid #00579a;
    border-radius: 5px;
    opacity: 0;
    transition: 0.2s;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  &.active {
    &::after {
      opacity: 1;
    }
  }
  &:hover {
    // transform: scale(1.01);
    .pic {
      figure {
        transform: scale(1.02);
      }
    }
  }
}
</style>
