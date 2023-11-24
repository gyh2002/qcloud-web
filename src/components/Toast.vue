<script setup>
import {watch} from "vue";

const props = defineProps(['message', 'visibleProp'])
const emit = defineEmits(['closeToast'])
watch(() => {
  return props.visibleProp;
}, (newVi, oldVi) => {
  if (newVi) {
    setTimeout(() => {
      emit('closeToast')
    }, 3000);
  }
})
</script>

<template>
  <transition name="fade">
    <div v-if="props.visibleProp" class="toast">
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