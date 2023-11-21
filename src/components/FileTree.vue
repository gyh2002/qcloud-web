<script setup>
import TriangleRight from "@/components/icons/TriangleRight.vue";
import Folder from "@/components/icons/Folder.vue";
import File from "@/components/icons/File.vue";
import { ref } from "vue";
import MoreAction from "@/components/icons/MoreAction.vue";
import ContextMenu from "@/components/ContextMenu.vue";

const emit = defineEmits(['chooseFile'])
const resolveChoose = (id) => {
  emit('chooseFile', id)
}

const props = defineProps(['tree'])
const isOpen = ref(false)
const contextMenuVisible = ref(false);
const contextMenuX = ref(0);
const contextMenuY = ref(0);
const clickParent = () => {
  openFile()
  isOpen.value = !isOpen.value
}
const openFile = () => {
  if (props.tree.folder)
    return
  emit('chooseFile', props.tree.id)
}
const showContextMenu = (event) => {
  contextMenuX.value = event.clientX;
  contextMenuY.value = event.clientY;
  contextMenuVisible.value = true;
};
const noVisible = () => {
  contextMenuVisible.value = false;
}
const doFocus = () => {
  console.log('focus')
}
</script>

<template>
  <div id="file-tree-wrap">
    <div id="parent" @click="clickParent">
      <triangle-right class="triangle-right" v-if="props.tree.folder && props.tree.children.length !== 0"
                      v-bind:style="{ 'transform': isOpen ? 'rotate(90deg)' : 'rotate(0)' }"></triangle-right>
      <folder class="folder-icon" v-if="props.tree.folder"
              v-bind:style="{ 'margin-left': props.tree.children.length !== 0 ? '0px' : '12px' }"></folder>
      <file class="file-icon" v-if="!props.tree.folder"
            v-bind:style="{ 'margin-left': props.tree.folder ? '0px' : '12px' }"></file>
      <span>{{ props.tree.name }}</span>
      <more-action class="more-action" @click.stop="showContextMenu"></more-action>
    </div>
    <div id="children" v-show="isOpen">
      <file-tree v-for="item in props.tree.children" :tree="item" @chooseFile="resolveChoose" v-if="props.tree">
      </file-tree>
    </div>
  </div>
  <context-menu @focus="doFocus" @blur="noVisible" :visibleProp="contextMenuVisible" :xProp="contextMenuX"
                :yProp="contextMenuY" @no-visible="noVisible"></context-menu>
</template>

<style scoped>
#file-tree-wrap {
  #parent {
    padding: 4px;
    border: 1px solid #00000000;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    .folder-icon, .file-icon, .more-action {
      width: 15px;
      height: 15px;
      min-width: 15px;
      min-height: 15px;
    }
    .triangle-right {
      width: 12px;
      height: 12px;
      min-width: 12px;
      min-height: 12px;
    }
    .more-action {
      display: none;
      margin-left: auto;
      border-radius: 50%;
    }
    .more-action:hover {
      background-color: #c5c5c5;
    }
    span {
      font-family: system-ui;
      font-size: 14px;
      font-weight: 100;
      white-space: nowrap;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 5px;
      user-select: none;
    }
  }
  #parent:hover {
    background-color: #eeeeee;
  }
  #parent:hover .more-action {
    display: block;
  }
  #parent:active {
    border: 1px dashed #555555;
  }
  #children {
    margin-left: 15px;
  }
}
</style>