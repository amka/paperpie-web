<template>
  <v-app-bar flat v-if="mobile || (!mobile && !appState.sidebarVisible)">
    <v-btn
      icon="mdi-menu"
      @click.stop="appState.sidebarVisible = !appState.sidebarVisible"
    />

    <div class="note-title mx-4" v-if="notesStore.currentNote">
      {{ notesStore.currentNote.title }}
    </div>
    <v-btn variant="tonal" color="primary" @click="notesStore.createNote()" prepend-icon="mdi-plus">Note</v-btn>
    <v-spacer />

    <v-btn  icon="mdi-cog-outline" @click="appState.showPreferences = true"></v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { useAppStore } from "@/store/app";
import { useNotesStore } from "@/store/notes";

const { mobile } = useDisplay();
const appState = useAppStore();
const notesStore = useNotesStore();
</script>
