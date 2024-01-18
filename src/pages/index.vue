<template>
  <div>
    <v-expand-transition>
      <EditorToolbar v-if="_editor != undefined" :editor="_editor"/>
    </v-expand-transition>
    <v-container class="h-100">
      <div id="editor-container" class="pa-4 mx-auto rounded-lg">
        <Editor v-model="notesStore.currentNote" @editor-ready="onEditorReady"/>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Editor as EditorType} from "@tiptap/vue-3";
import {useNotesStore} from "@/store/notes";
import Editor from "@/components/Editor.vue";
import EditorToolbar from "@/components/EditorToolbar.vue";

const notesStore = useNotesStore();
const _editor = ref<EditorType | undefined>()

// Init watcher to update model from the outside
const onEditorReady = (value: EditorType) => {
  _editor.value = value
}
</script>

<style lang="scss">
#editor-container {
  max-width: 920px;
  min-height: 100%;
  background-color: rgba(var(--v-theme-on-surface-variant), 0.07);
}

</style>
