<template>
  <v-app-bar scroll-behavior="elevate" style="position: sticky">
    <v-btn
      icon="bi bi-layout-sidebar-inset"
      @click.stop="appState.sidebarVisible = !appState.sidebarVisible"
    />

    <v-app-bar-title class="mx-4 flex-none">Paper Pie</v-app-bar-title>

    <div class="flex-grow-1">
      <v-btn
        color="primary"
        prepend-icon="bi bi-file-earmark-plus-fill"
        variant="tonal"
        @click="notesStore.createNote()"
      >Note
      </v-btn
      >
    </div>

    <v-btn
      icon="bi bi-gear"
      @click="appState.showPreferences = true"
    ></v-btn>

  </v-app-bar>
</template>

<script lang="ts" setup>
import {useDisplay} from "vuetify";
import {useAppStore} from "@/store/app";
import {useNotesStore} from "@/store/notes";

const {mobile} = useDisplay();
const appState = useAppStore();
const notesStore = useNotesStore();
</script>
