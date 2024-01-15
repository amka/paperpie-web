<template>
  <v-app-bar flat v-if="mobile || (!mobile && !appState.sidebarVisible)">
    <v-btn
      icon="mdi-menu"
      @click.stop="appState.sidebarVisible = !appState.sidebarVisible"
    />

    <div class="note-title mx-4" v-if="notesStore.currentNote">
      {{ notesStore.currentNote.title }}
    </div>
    <v-spacer />

    <v-btn variant="tonal" color="primary" @click="notesStore.createNote()">New Note</v-btn>
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
