<script setup>
import { ref, onMounted } from 'vue'
import { get } from "@/utils/axios";
import router from "@/router";
const username = ref('')
onMounted(() => {
  get('/user/get-by-token', {}).then((response) => {
    if (response.data.status === 200) {
      username.value = response.data.data.username
    }
  }).catch((error) => {
    if (error.request.status === 403) {
      router.push('/welcome')
    }
  })
})
</script>

<template>
  <div id="wrap-nav">
    <h3 id="title">QCloud</h3>
    <h4 id="user">{{ username }}</h4>
  </div>
</template>

<style scoped lang="less">
#wrap-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: system-ui;
  background-color: #f6f6f6;
  height: 50px;

  #title {
    margin: 10px 20px;
  }

  #user {
    margin: 10px 20px;
  }
}
</style>