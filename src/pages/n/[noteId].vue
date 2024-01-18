<template>
  <div class="d-flex flex-column h-100">
    <v-toolbar class="toolbar-row" density="comfortable">
      <v-btn icon="bi bi-layout-sidebar" @click.stop="appState.sidebarVisible = !appState.sidebarVisible"/>
      <v-expand-transition>
        <EditorToolbar v-if="showEditControls" :editor="_editor" class="px-4"/>
        <v-spacer/>
      </v-expand-transition>
      <v-btn icon="bi bi-layout-sidebar-inset-reverse"/>
    </v-toolbar>

    <v-container v-if="notesStore.currentNote" class="h-100">
      <div id="editor-container" class="pa-4 mx-auto rounded-lg">
        <Editor v-model="notesStore.currentNote" @editor-ready="onEditorReady"/>
      </div>
    </v-container>

    <v-container v-else class="d-flex flex-grow-1 align-center justify-center flex-column">
      <v-icon icon="bi bi-journal" size="64"/>
      <h1 class="text-h4 mt-6 mb-4 ">Nothing found</h1>
      <div class="text-h5 mt-6 text-center font-weight-thin">Create your first note</div>
      <div class="text-h6 text-center font-weight-thin">or select one from the sidebar</div>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {Editor as EditorType} from "@tiptap/vue-3";
import {useNotesStore} from "@/store/notes";
import {useAppStore} from "@/store/app";
import Editor from "@/components/Editor.vue";
import EditorToolbar from "@/components/EditorToolbar.vue";

const appState = useAppStore();
const notesStore = useNotesStore();
const _editor = ref<EditorType | undefined>()

const route = useRoute();
const noteId = ref<string | undefined>();

const showEditControls = computed(() => {
  return _editor.value && notesStore.currentNote
})

// Init watcher to update model from the outside
const onEditorReady = (value: EditorType) => {
  _editor.value = value

}
onMounted(() => {
  noteId.value = route.params.noteId as string
  console.log(`[Page] ${noteId}`)
  notesStore.setCurrentNote(noteId.value!)
})
</script>

<style lang="scss">
.toolbar-row {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background-color: rgba(var(--v-theme-on-surface-variant), 1);
}

#editor-container {
  max-width: 920px;
  min-height: 100%;
  background-color: rgba(var(--v-theme-on-surface-variant), 0.07);
}
</style>
