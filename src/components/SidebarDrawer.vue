<template>
  <v-navigation-drawer
    v-model="appState.sidebarVisible"
    floating
  >
    <v-list :selected="[notesStore.currentNote?.noteId]" class="px-4">
      <v-list-subheader>Notes</v-list-subheader>
      <template v-for="note in notesStore.notes" :key="note.noteId">
        <v-list-item
          :title="note.title!.length > 0 ? note.title  : 'Untitled Note'"
          :value="note.noteId"
          color="primary"
          density="compact"
          nav
          rounded="rounded"
          @click="notesStore.currentNote = note"
        >
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {useNotesStore} from "@/store/notes";
import {onMounted} from "vue";
import {useAppStore} from "@/store/app";

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
