<template>
  <v-navigation-drawer
    v-model="appState.sidebarVisible"
    style="position: fixed"
    class="custom-scrollbar"
  >

    <template v-slot:prepend>
      <v-toolbar scroll-behavior="elevate" style="position: sticky">
<!--        <v-btn-->
<!--          icon="bi bi-layout-sidebar-inset"-->
<!--          @click.stop="appState.sidebarVisible = !appState.sidebarVisible"-->
<!--        />-->

        <v-toolbar-title class="mx-4">Paper Pie</v-toolbar-title>

        <v-toolbar-items>
          <v-btn
            icon="bi bi-file-earmark-plus-fill"
            color="primary"
            @click="notesStore.createNote()"
          />
        </v-toolbar-items>
<!--        <v-btn-->
<!--          icon="bi bi-gear"-->
<!--          @click="appState.showPreferences = true"-->
<!--        ></v-btn>-->

      </v-toolbar>

    </template>

    <div class="text-overline px-4">Notes</div>
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

