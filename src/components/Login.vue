<script setup>
import { ref, defineEmits } from 'vue';
import { postNoAuth } from '@/utils/axios'
import router from "@/router";
import { useUserStore } from "@/store"

const emit = defineEmits(['toSignUp']);
const email = ref('')
const password = ref('')
const info = ref('')
const goSignUp = (event) => {
  event.preventDefault();
  emit('toSignUp');
}
const doLogin = () => {
  info.value = ''
  if (email.value !== '' && password.value !== '') {
    postNoAuth('/user/login', {
      email: email.value,
      password: password.value
    }).then((response) => {
      if (response.data.status === 200) {
        info.value = 'Success';
        useUserStore().login(response.data.data.access_token);
        router.push('/')
      } else {
        info.value = response.data.message;
      }
    }).catch((error) => {
      info.value = 'Network error, try it later.'
    })
  } else {
    info.value = 'Please fill out all the required fields.'
  }
}
</script>

<template>
  <div id="login-wrap">
    <div id="login-board">
      <h1>Sign In</h1>
      <input class="text-input" v-model="email" type="text" placeholder="Email Address">
      <input class="text-input" v-model="password" type="password" placeholder="Password">
      <input class="button-input" type="button" value="Sign In" @click="doLogin">
      <div id="login-text-warp">
        <a id="forget-a" href="#">Forgot Password?</a>
        <div id="register-w">
          <span id="register-text">Don’t have an account yet?</span>
          <a id="register-a" href="#" @click="goSignUp">Sign Up</a>
        </div>
      </div>
    </div>
    <div id="login-info" v-if="info !== ''">
      <span>{{ info }}</span>
    </div>
  </div>
</template>

<style scoped>
#login-wrap {
  font-family: system-ui;
  width: 500px;

  #login-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #171717;
    color: white;
    border-radius: 10px;
    width: 100%;

    .text-input {
      padding: 12px 12px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      background-color: #fff;
      margin: 10px auto;
      width: 75%;
    }

    .text-input::placeholder {
      color: #ce9797;
      font-size: 14px;
    }

    .text-input:focus {
      outline: none;
      border: none;
    }

    .button-input {
      --color: #000;
      width: calc(75% + 24px);
      box-sizing: border-box;
      padding: 12px 0;
      margin: 10px auto;
      border: 2px solid var(--color);
      font-size: 16px;
      border-radius: 5px;
      font-weight: 500;
      color: white;
      cursor: pointer;
      background-color: #212121;
      transition: all .2s;
    }

    .button-input:hover {
      background-color: #2c2c2c;
    }

    .button-input:active {
      background: #808080;
      transition: background 0s;
    }

    #login-text-warp {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      #forget-a {
        color: white;
        margin: 10px auto;
      }

      #forget-a:hover {
        color: #3288ef;
      }

      #register-w {
        text-align: center;
        margin: 0 auto 35px auto;

        #register-a {
          color: white;
        }

        #register-a:hover {
          color: #3288ef;
        }
      }
    }
  }
  #login-info {
    width: calc(100% - 2px);
    height: 10%;
    margin: 5% 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #d14343;
    border-radius: 5px;

    span {
      color: #d14343;
      max-width: 80%;
      word-wrap: break-word;
    }
  }
}
</style>