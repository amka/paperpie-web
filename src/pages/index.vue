<template>
  <v-container class="h-100">
    <div id="editor-container" class="pa-4 mx-auto rounded-lg">
      <Editor v-model="notesStore.currentNote" />
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import Editor from "../components/Editor.vue";
import { useNotesStore } from "@/store/notes";

const notesStore = useNotesStore();
</script>

<style lang="scss">
#editor-container {
  max-width: 920px;
  min-height: 100%;
  background-color: rgba(var(--v-theme-on-surface-variant), 0.07);
}
</style>
