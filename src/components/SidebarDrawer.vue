<template>
  <v-navigation-drawer
    v-model="appState.sidebarVisible"
    floating
    style="position: fixed"
    class="custom-scrollbar"
  >

    <template v-slot:prepend>
      <div class="text-overline px-4">Notes</div>
    </template>

    <v-list :selected="[notesStore.currentNote?.noteId]" class="px-2">
      <!--      <v-list-subheader>Notes</v-list-subheader>-->
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

