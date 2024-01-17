<template>
  <v-app-bar style="position: sticky" scroll-behavior="elevate">
    <v-btn
      icon="bi bi-layout-sidebar-inset"
      @click.stop="appState.sidebarVisible = !appState.sidebarVisible"
    />

    <v-app-bar-title class="mx-4 flex-none">Paper Pie</v-app-bar-title>

    <div class="flex-grow-1">
      <v-btn
        prepend-icon="bi bi-file-earmark-plus-fill"
        variant="tonal"
        color="primary"
        @click="notesStore.createNote()"
      >Note</v-btn
      >
    </div>

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

<style>
.v-toolbar-title {
  flex: unset;
}
</style>
