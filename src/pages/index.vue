<template>
  <v-container class="h-100">
    <div id="editor-container" class="h-100 pa-4 mx-auto rounded-lg">
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
  // background-color: rgb(var(--v-theme-on-surface-variant));
}
</style>
