<template>
  <v-app-bar flat style="position: sticky">
    <v-btn
      icon="bi bi-layout-sidebar-inset"
      @click.stop="appState.sidebarVisible = !appState.sidebarVisible"
    />

    <v-app-bar-title>Paper Pie</v-app-bar-title>

    <v-spacer />
    <v-btn
      variant="tonal"
      color="primary"
      @click="notesStore.createNote()"
      prepend-icon="bi bi-file-earmark-plus-fill"
      >Note</v-btn
    >

    <v-btn
      icon="bi bi-gear"
      @click="appState.showPreferences = true"
    ></v-btn>
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
