<template>
  <div id="sidebar-view">
    <div id="sidebar-header" class="pa-8">
      <v-row justify="space-between">
        <div class="text-h5">Paper Pie</div>

        <v-btn
          icon="mdi-menu-open"
          size="sm"
          variant="text"
          title="Toggle sidebar"
          @click.stop="appState.sidebarVisible = !appState.sidebarVisible"
        />
      </v-row>

      <v-row class="mt-6">
        <v-btn
          block
          variant="tonal"
          color="primary"
          @click="notesStore.createNote()"
          >New Note</v-btn
        >
      </v-row>
    </div>

    <v-col>
      <v-list :selected="[notesStore.currentNote?.noteId]">
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

      <div class="pa-4"></div>
    </v-col>
  </div>
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
  background-color: rgb(var(--v-theme-on-surface-variant));
}
</style>
