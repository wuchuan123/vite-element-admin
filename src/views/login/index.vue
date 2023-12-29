<template>
  <div class="login-container">
    <el-card class="w-100 rounded-10">
      <h2>账号登录</h2>
      <el-form :model="loginData">
        <el-form-item prop="username">
          <el-input
            v-model="loginData.username"
            class="w-50 m-2"
            placeholder="Type something"
          >
            <template #prefix>
              <svg-icon icon-class="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginData.password"
            class="w-50 m-2"
            placeholder="Type something"
          >
            <template #prefix>
              <svg-icon icon-class="password" />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button>点击</el-button>
    </el-card>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue';

const loginData = ref({
  username: 'admin',
  password: '123456',
});

</script>

<style scoped lang="less">
@import "./login.less";
</style>
