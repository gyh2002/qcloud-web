<script setup>
import Login from "@/components/Login.vue";

import { ref } from 'vue';
import Register from "@/components/Register.vue";

const showPanel = ref(1);
const clickSignIn = () => {
  showPanel.value = 2
}
const clickSignUp = () => {
  showPanel.value = 3
}
const sideChangePanel = (num) => {
  showPanel.value = num;
}
</script>

<template>
  <div id="welcome-wrap">
    <h1>QCloud</h1>
    <div id="sign-up-in">
      <input type="button" class="input-btn" v-if="showPanel === 1" @click="clickSignIn" value="Sign In">
      <input type="button" class="input-btn" v-if="showPanel === 1" @click="clickSignUp" value="Sign Up">
      <Login v-if="showPanel === 2" @toSignUp="sideChangePanel(3)"></Login>
      <register v-if="showPanel === 3" @toSignIn="sideChangePanel(2)"></register>
    </div>
  </div>

</template>

<style scoped>
#welcome-wrap {
  height: 100%;
  background-color: #f4f6fa;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  h1 {
    font-family: system-ui;
    font-size: 3em;
    margin-top: 20px;
  }

  #sign-up-in {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}

.input-btn {
  font-family: system-ui;
  width: 120px;
  height: 50px;
  line-height: 50px;
  margin: 20px;
  border: 2px solid #000;
  transition: all .2s;
  font-size: 17px;
  border-radius: 6px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  background-color: #f4f6fa;
}
.input-btn:hover {
  color: #fff;
  background-color: black;
}
.input-btn:active {
  background: #808080;
  transition: background 0s;
}
</style>