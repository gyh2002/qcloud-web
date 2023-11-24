<script setup>
import {onMounted, ref, watch} from "vue";
import Vditor from 'vditor'
import 'vditor/dist/index.css';
import { get, post } from "@/utils/axios";
import router from "@/router";
import save from "@/assets/svg/save.svg"
import Toast from "@/components/Toast.vue";

const props = defineProps(['fileId'])
const content = ref('')
const vditor = ref();
const toastMessage = ref('');
const toastVisible = ref(false);
const showToast = (message) => {
  toastMessage.value = message;
  toastVisible.value = true;
};
const refreshContent = () => {
  get('/file/get-file-content', {
    fileId: props.fileId
  }).then((response) => {
    if (response.data.status === 200) {
      content.value = response.data.data
      vditor.value.setValue(content.value);
      showToast('success')
    } else {
      showToast('failed')
    }
  }).catch((error) => {
    if (error.request.status === 403) {
      router.push('/welcome')
    }
  })
}
watch(() => {
  return props.fileId;
}, (newFileId, oldFileId) => {
  get('/file/get-file-content', {
    fileId: newFileId
  }).then((response) => {
    if (response.data.status === 200) {
      content.value = response.data.data
      vditor.value.setValue(content.value);
    }
  }).catch((error) => {
    if (error.request.status === 403) {
      router.push('/welcome')
    }
  })
})
const doSave = () => {
  post('/file/update-file', {
    id: props.fileId,
    content: vditor.value.getValue()
  }).then((response) => {
    if (response.data.status === 200) {
      showToast('success')
    } else {
      showToast('failed')
    }
  }).catch((error) => {
    if (error.request.status === 403) {
      router.push('/welcome')
    }
  })
}
onMounted(() => {
  vditor.value = new Vditor('content-wrap', {
    after() {
      vditor.value.setValue('')
    },
    mode: 'wysiwyg',
    width: '100%',
    toolbar: [
      "headings",
      "bold",
      "italic",
      "strike",
      "link",
      "table",
      "|",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "|",
      "quote",
      "line",
      "code",
      "inline-code",
      "insert-before",
      "insert-after",
      "|",
      "undo",
      "redo",
      "|",
      "fullscreen",
      "edit-mode",
      "outline",
      {
        name: 'save',
        tip: 'save',
        tipPosition: 's',
        icon: "<svg t=\"1699874873667\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.o" +
            "rg/2000/svg\" p-id=\"6193\"\n" +
            "     width=\"200\" height=\"200\">\n" +
            "    <path d=\"M139.6224 69.8368c-38.5536 0-69.7856 31.232-69.7856 69.7856v744.7552c0 38.5536 31.232 69.7856" +
            " 69.7856 69.7856h744.7552c38.5536 0 69.7856-31.232 69.7856-69.7856V139.6224c0-38.5536-31.232-69.7856-69.785" +
            "6-69.7856H139.6224zM884.3776 0A139.6224 139.6224 0 0 1 1024 139.6224v744.7552A139.6224 139.6224 0 0 1 884.3" +
            "776 1024H139.6224A139.6224 139.6224 0 0 1 0 884.3776V139.6224A139.6224 139.6224 0 0 1 139.6224 0h744.7552z " +
            "m-169.8816 124.672a34.9184 34.9184 0 0 0-34.9184 34.9184V256a34.9184 34.9184 0 0 0 69.8368 0V159.5904a34.91" +
            "84 34.9184 0 0 0-34.9184-34.9184zM140.4928 48.128l69.7856 0.3072-1.0752 227.6352c-1.536 20.7872 5.12 37.580" +
            "8 21.248 53.0944 16.0256 15.4112 38.0928 22.4256 70.8608 20.48l441.6 0.2048c24.6784-2.816 42.0352-10.9056 5" +
            "3.76-24.0128 11.6736-13.1584 17.7152-30.8736 17.664-54.9376V48.2304h69.8368v222.5664c0.0512 40.3968-11.6224" +
            " 74.752-35.4304 101.4784-23.808 26.7264-57.0368 42.24-101.888 47.104h-443.392c-49.1008 3.0208-90.368-10.086" +
            "4-121.3952-39.936-30.9248-29.696-45.568-66.7648-42.5984-106.0864l1.024-225.28z\"\n" +
            "          fill=\"#707070\" p-id=\"6194\"></path>\n" +
            "</svg>",
        click () {doSave()},
      },
      {
        name: 'refresh',
        tip: 'refresh',
        tipPosition: 's',
        icon: "<svg t=\"1700784940079\" class=\"icon\" viewBox=\"0 0 1029 1024\" version=\"1.1\" xmlns=\"http://www.w3.o" +
            "rg/2000/svg\" p-id=\"4044\" width=\"200\" height=\"200\"><path d=\"M1007.2 262.4c-12.8-6.4-32 0-38.4 19.2l-" +
            "25.6 70.4C904.8 256 847.2 179.2 757.6 128c-108.8-64-230.4-89.6-352-57.6C232.8 108.8 104.8 236.8 60 409.6 53" +
            ".6 428.8 66.4 441.6 79.2 448 98.4 448 111.2 441.6 117.6 422.4c38.4-153.6 153.6-268.8 307.2-300.8 108.8-25.6" +
            " 217.6-6.4 307.2 51.2 76.8 44.8 134.4 115.2 166.4 198.4l-76.8-32c-12.8-6.4-32 0-38.4 19.2-6.4 12.8 0 32 12." +
            "8 38.4l128 51.2c6.4 6.4 12.8 6.4 19.2 6.4 0 0 6.4 0 6.4 0 0 0 0 0 0 0 0 0 0 0 6.4 0 6.4 0 12.8-6.4 12.8-12." +
            "8L1026.4 294.4C1032.8 281.6 1020 268.8 1007.2 262.4zM949.6 576c-12.8-6.4-32 6.4-32 19.2-38.4 153.6-153.6 26" +
            "8.8-307.2 300.8-108.8 25.6-217.6 6.4-307.2-51.2-76.8-44.8-134.4-115.2-166.4-198.4l76.8 32c12.8 6.4 32 0 38." +
            "4-19.2 6.4-12.8 0-32-12.8-38.4L104.8 576C98.4 576 92 569.6 85.6 569.6c0 0-6.4 0-6.4 0 0 0 0 0 0 0 0 0 0 0-6" +
            ".4 0C66.4 576 60 582.4 60 588.8L2.4 729.6c-6.4 12.8 0 32 19.2 38.4 12.8 6.4 32 0 38.4-19.2l25.6-70.4C124 76" +
            "8 181.6 844.8 271.2 896c108.8 64 230.4 89.6 352 57.6 172.8-38.4 307.2-172.8 345.6-345.6C975.2 595.2 962.4 5" +
            "82.4 949.6 576z\" fill=\"#8a8a8a\" p-id=\"4045\"></path></svg>",
        click() {refreshContent()},
      },
      {
        name: "more",
        toolbar: [
          "both",
          "export",
          "preview",
          "info",
        ],
      },
    ],
  });
});
</script>

<template>
  <div id="content-wrap">
  </div>
  <Toast :message="toastMessage" :visibleProp="toastVisible" />
</template>

<style scoped>
#content-wrap {
  flex: 1;
}
</style>