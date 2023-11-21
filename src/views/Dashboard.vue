<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import SideBar from "@/components/SideBar.vue";
import FileContent from "@/components/FileContent.vue";
import { ref, onMounted } from 'vue'

onMounted(() => {
  (function () {
    const sidebar = document.getElementById('wrap-left');
    const resizeHandle = document.getElementById('hr');
    let isResizing = false;
    resizeHandle.addEventListener('mousedown', (e) => {
      isResizing = true;
      const startX = e.clientX;
      const initialWidth = sidebar.offsetWidth;
      console.log("down", startX, initialWidth)
      document.addEventListener('mousemove', (e) => {
        if (isResizing) {
          const width = initialWidth + (e.clientX - startX);
          sidebar.style.width = `${width}px`;
        }
      });
      document.addEventListener('mouseup', () => {
        isResizing = false;
        document.removeEventListener('mousemove', null);
      });
    });
  })();
})

const cFileId = ref(-1)

const resolveChoose = (id) => {
  cFileId.value = id
}
</script>

<template>
  <div id="wrap-dash">
    <div id="wrap-left">
      <navigation-bar></navigation-bar>
      <side-bar @chooseFile="resolveChoose"></side-bar>
    </div>
    <div id="hr"></div>
    <div id="side-content-wrap">
      <file-content :file-id="cFileId"></file-content>
    </div>
  </div>
</template>

<style scoped lang="less">
#wrap-dash {
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;

  #wrap-left {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 200px;
  }
  #hr {
     width: 1px;
     height: 100%;
     background-color: #f6f6f6;
     cursor: ew-resize;
   }
  #hr:hover {
    box-shadow: inset 20px 0 20px #808080, inset -20px 0 20px #808080;
  }
  #side-content-wrap {
    display: flex;
    flex-direction: row;
    height: 100%;
    flex: 1;
  }
}
</style>