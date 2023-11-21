<script setup>
import {ref, watchEffect} from "vue";

const props = defineProps(['message', 'visibleProp'])
const visible = ref(false);
watchEffect(() => {
  visible.value = props.visibleProp;
  if (props.visibleProp) {
    setTimeout(() => {
      visible.value = false;
    }, 3000);  // 3秒后自动关闭
  }
});
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="toast">
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px;
  background: rgba(0,0,0,0.7);
  color: #fff;
  border-radius: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>