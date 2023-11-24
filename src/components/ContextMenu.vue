<script setup>
import {watch} from "vue";

const props = defineProps(['visibleProp', 'xProp', 'yProp', 'chooseItem'])
const emit = defineEmits(['noVisible'])

const doSomething = () => {
  console.log('菜单项被点击');
  console.log(props.chooseItem)
  emit('noVisible')
}
const listener = (event) => {
  const targetElement = document.getElementById('context-menu');
  if (targetElement != null && event.target !== targetElement && !targetElement.contains(event.target)) {
    emit('noVisible')
  }
}
const addFolder = () => {
  emit('noVisible')
}
const addFile = () => {
  emit('noVisible')
}
const deleteItem = () => {
  emit('noVisible')
}
const renameItem = () => {
  emit('noVisible')
}
const closeMenu = () => {
  emit('noVisible')
}
watch(() => {
  return props.visibleProp;
}, (newVisible, oldVisible) => {
  if (newVisible) {
    console.log(1)
    document.addEventListener('click', listener);
  } else {
    console.log(2)
    document.removeEventListener('click', listener);
  }
})
</script>

<template>
  <div v-if="props.visibleProp" id="context-menu" :style="{ top: `${props.yProp}px`, left: `${props.xProp}px` }">
    <div class="menu-item" @click="addFolder" v-if="props.chooseItem.folder">
      <span>new folder</span>
    </div>
    <div class="menu-item" @click="addFile" v-if="props.chooseItem.folder">
      <span>new file</span>
    </div>
    <div class="menu-item" @click="doSomething">
      <span>rename</span>
    </div>
    <div class="menu-item" @click="doSomething">
      <span>delete</span>
    </div>
    <div class="menu-item" @click="doSomething">
      <span>cancel</span>
    </div>
  </div>
</template>

<style scoped>
#context-menu {
  position: fixed;
  background: #fff;
  border: 1px solid #ccc;
  z-index: 100;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: system-ui;

  .menu-item {
    cursor: pointer;
    span {
      display: block;
      padding: 6px 20px;
      font-size: 13px;
    }
  }
  .menu-item:hover {
    background-color: #f0f0f0;
  }
}
</style>