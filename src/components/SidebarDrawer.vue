<template>
  <v-navigation-drawer
    v-model="appState.sidebarVisible"
    floating
  >
    <v-list :selected="[notesStore.currentNote?.noteId]" class="px-4">
      <v-list-subheader>Notes</v-list-subheader>
      <template v-if="notesStore.notes != undefined">
        <template v-for="note in notesStore.notes" :key="note.noteId">
          <v-list-item
            :value="note.noteId"
            @click="notesStore.currentNote = note"
            :title="note.title"
            color="primary"
            rounded="rounded"
            density="compact"
            nav
          >
          </v-list-item>
        </template>
      </template>
      <template v-else>
        <v-progress-circular />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useNotesStore } from "@/store/notes";
import { onMounted } from "vue";
import { useAppStore } from "@/store/app";

const appState = useAppStore();
const notesStore = useNotesStore();

onMounted(async () => {
  notesStore.fetchNotes();
});
</script>

<style lang="scss">
#sidebar-header {
  // height: 128px;
  // background-color: rgb(var(--v-theme-on-surface-variant));
}
</style>
