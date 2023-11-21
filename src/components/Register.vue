<script setup>
import {defineEmits, ref, watch, onBeforeUnmount } from 'vue';
import { post, get } from '@/utils/axios'
import router from "@/router";
import { useUserStore } from "@/store"

const emit = defineEmits(['toSignIn']);
const username = ref('')
const email = ref('')
const password = ref('')
const code = ref('')
const info = ref('')
const isSend = ref(false)
const leftSecond = ref(30)
let timer
const goSignIn = (event) => {
  event.preventDefault();
  emit('toSignIn');
}
const sendCode = () => {
  info.value = ''
  if (email.value !== '') {
    get('/user/send-code', {email: email.value}).then((response) => {
      if (response.data.status === 200) {
        isSend.value = !isSend.value
        timer = setInterval(() => {
          leftSecond.value -= 1;
        }, 1000);
      } else {
        info.value = response.data.message;
      }
    }).catch((error) => {
      info.value = 'Network error, try it later.'
    })
  } else {
    info.value = 'Please fill out the email field.'
  }
}

watch(leftSecond, (newValue) => {
  if (newValue === 0) {
    clearInterval(timer);
    isSend.value = false
    leftSecond.value = 30
  }
});

const doRegister = () => {
  if (username.value !== '' && email.value !== '' && password.value !== '' && code.value !== '') {
    post('/user/register', {
      username: username.value,
      email: email.value,
      password: password.value,
      code: code.value
    }).then((response) => {
      if (response.data.status === 200) {
        info.value = 'Success';
        setTimeout(() => {
          emit('toSignIn')
        }, 500);
      } else {
        info.value = response.data.message
      }
    }).catch((error) => {
      info.value = 'Network error, try it later.'
    })
  } else {
    console.log(username.value, email.value, password.value, code.value)
    info.value = 'Please fill out all the required fields.'
  }
}

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
  <div id="register-wrap">
    <div id="register-board">
      <h1>Sign Up</h1>
      <div id="email-text-btn">
        <input id="email-input" v-model="email" type="text" placeholder="Email Address">
        <input id="button-email" type="button" :value="isSend ? leftSecond : 'Send code'" @click="sendCode" :disabled="isSend">
      </div>
      <input class="text-input" v-model="code" type="text" placeholder="Verification Code">
      <input class="text-input" v-model="username" type="text" placeholder="Username">
      <input class="text-input" v-model="password" type="password" placeholder="Password">
      <input class="button-input" type="button" value="Sign Up" @click="doRegister">
      <div id="register-text-warp">
        <div id="terms-w">
          <span id="terms-text">By signing up, you agree to the </span>
          <a id="terms-a" href="#">Terms of Use</a>
        </div>
        <div id="login-w">
          <span id="login-text">Already have an account?</span>
          <a id="login-a" href="#" @click="goSignIn">Sign In</a>
        </div>
      </div>
    </div>
    <div id="register-info" v-if="info !== ''">
      <span>{{ info }}</span>
    </div>
  </div>
</template>

<style scoped>
#register-wrap {
  font-family: system-ui;
  width: 500px;

  #register-board {
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

    #email-text-btn {
      width: calc(75% + 24px);
      display: flex;
      flex-direction: row;
      align-items: center;

      #email-input {
        padding: 12px 12px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        background-color: #fff;
        margin: 10px auto;
        width: 90%;
      }
      #email-input::placeholder {
        color: #ce9797;
        font-size: 14px;
      }
      #email-input:focus {
        outline: none;
        border: none;
      }
      #button-email {
        --color: #000;
        padding: 12px 15px;
        width: 150px;
        margin-left: 15px;
        box-sizing: border-box;
        border: 2px solid var(--color);
        font-size: 16px;
        border-radius: 5px;
        font-weight: 500;
        color: white;
        cursor: pointer;
        background-color: #212121;
        transition: all .2s;
      }
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

    #register-text-warp {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      #terms-w {
        margin: 10px auto;

        #terms-a {
          color: white;
        }

        #terms-a:hover {
          color: #3288ef;
        }
      }

      #login-w {
        text-align: center;
        margin: 0 auto 35px auto;

        #login-a {
          color: white;
        }

        #login-a:hover {
          color: #3288ef;
        }
      }
    }
  }
  #register-info {
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