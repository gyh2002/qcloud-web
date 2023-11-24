<script setup>
import { ref, onMounted } from 'vue'
import { get } from "@/utils/axios";
import router from "@/router";
import FileTree from "@/components/FileTree.vue";

const emit = defineEmits(['chooseFile'])
const resolveChoose = (id) => {
  emit('chooseFile', id)
}

const tree = ref(null)

const sortFileTree = (tree) => {
  tree.children.sort((a, b) => {
    if (a.folder && !b.folder) {
      return -1;
    } else if (!a.folder && b.folder) {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });
  for (let i = 0; i < tree.children; i++) {
    if (tree.folder) {
      sortFileTree(tree.children[i]);
    }
  }
}

onMounted(async () => {
  try {
    const response = await get('/file/get-files-status', {})
    if (response.data.status === 200) {
      tree.value = response.data.data
      sortFileTree(tree.value)
    } else {
    }
  } catch (error) {
    tree.value = null
    if (error.request.status === 403) {
      await router.push('/welcome')
    }
  }
})
</script>

<template>
  <div id="wrap-side">
    <file-tree v-for="item in tree.children" :tree="item" :parent="null" @chooseFile="resolveChoose" v-if="tree"></file-tree>
  </div>
</template>

<style scoped lang="less">
#wrap-side {
  background-color: #f6f6f6;
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  scrollbar-width: thin;
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: #ccc;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>