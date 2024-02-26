<template>
  <div id="login">
    <div class="pic">
      <figure :style="`background-image: url(${require('@/assets/img/F2NA2xiaoAA4Ucl.jpeg')});`"></figure>
    </div>
    <div class="inner w1000">
      <div class="login_form">
        <h3 class="txt-bold">Login</h3>
        <div class="input_block">
          <el-input placeholder="使用者名稱"></el-input>
        </div>
        <div class="input_block">
          <el-input placeholder="密碼"></el-input>
        </div>
        <el-button
          type="primary"
          @click="$router.push('/')"
        >
          登入
        </el-button>
        <el-button
          type="primary"
          plain
          @click="$router.push('/signup')"
        >
          新建
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable  no-unused-vars */
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'

// onMounted
onMounted(() => {})
</script>
