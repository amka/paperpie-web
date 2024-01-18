<template>
  <div class="d-flex flex-column h-100">

    <v-toolbar class="toolbar-row" density="comfortable">
      <v-btn icon="bi bi-layout-sidebar" @click.stop="appState.sidebarVisible = !appState.sidebarVisible"/>
      <v-expand-transition>
        <EditorToolbar v-if="_editor != undefined" :editor="_editor"/>
        <v-spacer v-else/>
      </v-expand-transition>
      <v-btn v-if="_editor" icon="bi bi-layout-sidebar-inset-reverse"/>
    </v-toolbar>

    <v-container class="d-flex flex-grow-1 align-center justify-center flex-column">
      <v-icon icon="bi bi-journal" size="64"/>
      <h1 class="text-h4 mt-6 mb-4 ">Paper Pie</h1>
      <div class="text-h5 mt-6 text-center font-weight-thin">Create your first note</div>
      <div class="text-h6 text-center font-weight-thin">or select one from the sidebar</div>
      <v-btn
        class="mt-4"
        color="primary"
        prepend-icon="bi bi-file-earmark-plus-fill"
        text="Create note"
        variant="tonal"
        @click="onNoteCreate"
      />

    </v-container>

  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {Editor as EditorType} from "@tiptap/vue-3";
import EditorToolbar from "@/components/EditorToolbar.vue";
import {useAppStore} from "@/store/app";
import {useNotesStore} from "@/store/notes";

const router = useRouter();
const appState = useAppStore();
const notesStore = useNotesStore();
const _editor = ref<EditorType | undefined>()

// Init watcher to update model from the outside

const onNoteCreate = () => {
  const note = notesStore.createNote()
  router.push('/n/' + note.noteId)
}
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
