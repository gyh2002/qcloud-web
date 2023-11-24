<script setup>
import TriangleRight from "@/components/icons/TriangleRight.vue";
import Folder from "@/components/icons/Folder.vue";
import File from "@/components/icons/File.vue";
import { ref } from "vue";
import MoreAction from "@/components/icons/MoreAction.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import {post} from "@/utils/axios";
import router from "@/router";

const emit = defineEmits(['chooseFile'])
const resolveChoose = (id) => {
  emit('chooseFile', id)
}

const props = defineProps(['tree', 'parent'])
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
const resolveAction = (action) => {
  console.log(action)
  if (action === 'newFolder') {
    isOpen.value = true
    props.tree.children.push({
      id: '-1',
      name: '',
      hash: '',
      versionNo: 0,
      children: [],
      folder: true,
      isNew: true
    })
  } else if (action === 'newFile') {
    isOpen.value = true
    props.tree.children.push({
      id: '-1',
      name: '',
      hash: '',
      versionNo: 0,
      children: [],
      folder: false,
      isNew: true
    })
  } else if (action === 'rename') {

  } else if (action === 'delete') {

  }
}
const newName = ref('')
const inputColor = ref('blue')
const checkName = (nowName, bros) => {
  let flag = true
  for (let i = 0; i < bros.length; i++) {
    if (bros[i].isNew == null || bros[i].isNew === false) {
      if (bros[i].name === nowName) {
        flag = false
        break
      }
    }
  }
  return flag
}
const handleInputChange = (event) => {
  const bros = props.parent.children
  const nowName = event.target.value
  let flag = checkName(nowName, bros)
  if (flag) {
    inputColor.value = 'blue'
  } else {
    inputColor.value = 'red'
  }
}
const submitNew = (event) => {
  const bros = props.parent.children
  const nowName = event.target.value
  let flag = checkName(nowName, bros)
  if (flag) {
    if (props.tree.folder) {
      post('/file/create-folder', {
        parentId: props.parent.id,
        name: nowName
      }).then((response) => {
        if (response.data.status === 200) {
          props.tree.id = response.data.data.id
          props.tree.name = nowName
          props.tree.isNew = false
        } else {
          props.parent.children.splice(props.parent.children.indexOf(props.tree), 1)
        }
      }).catch((error) => {
        if (error.request.status === 403) {
          router.push('/welcome')
        }
      })
    } else {
      post('/file/create-file', {
        parentId: props.parent.id,
        name: nowName
      }).then((response) => {
        if (response.data.status === 200) {
          props.tree.id = response.data.data.id
          props.tree.name = nowName
          props.tree.isNew = false
        } else {
          props.parent.children.splice(props.parent.children.indexOf(props.tree), 1)
        }
      }).catch((error) => {
        if (error.request.status === 403) {
          router.push('/welcome')
        }
      })
    }
  } else {

  }
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
      <span class="item-name"
            v-if="props.tree.isNew == null || props.tree.isNew === false">
        {{ props.tree.name }}
      </span>
      <input class="input-item-name" type="text" v-if="props.tree.isNew != null && props.tree.isNew === true"
             v-model="newName" @input="handleInputChange" @blur="submitNew" @keyup.enter="submitNew"
             :style="{ borderColor: inputColor }">
      <more-action class="more-action" @click.stop="showContextMenu"></more-action>
    </div>
    <div id="children" v-show="isOpen">
      <file-tree v-for="item in props.tree.children" :tree="item" :parent="props.tree" @chooseFile="resolveChoose"
                 v-if="props.tree">
      </file-tree>
    </div>
  </div>
  <context-menu @blur="noVisible" :visibleProp="contextMenuVisible" :xProp="contextMenuX"
                :yProp="contextMenuY" :choose-item="props.tree" @no-visible="noVisible" @do-action="resolveAction">
  </context-menu>
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
    .item-name {
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
    .input-item-name {
      font-family: system-ui;
      line-height: 14px;
      font-weight: 100;
      width: 100%;
      margin: 0 5px;
      outline: none;
      border: 2px solid blue;
      border-radius: 3px;
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