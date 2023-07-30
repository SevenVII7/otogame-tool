<template>
  <div id="login">
    <div class="pic">
      <figure :style="`background-image: url(${require('@/assets/img/F2NA2xiaoAA4Ucl.jpeg')});`"></figure>
    </div>
    <div class="inner w1000">
      <div class="login_form">
        <h3 class="txt-bold">
          Sign Up
        </h3>
        <div class="input_block">
          <el-input placeholder="使用者名稱"></el-input>
        </div>
        <div class="input_block">
          <el-input placeholder="密碼"></el-input>
        </div>
        <el-button
          type="primary"
          @click="$router.push('/login')"
        >
          新建使用者
        </el-button>
        <el-button
          type="primary"
          plain
          @click="$router.push('/login')"
        >
          回登入頁
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable  no-unused-vars */
import axios from "axios";
import { ref, computed, onMounted, defineProps } from "vue";


// onMounted
onMounted(() => {});
</script>
<style
  scoped
  src="@/assets/scss/login.scss"
  lang="scss"
>
</style>
