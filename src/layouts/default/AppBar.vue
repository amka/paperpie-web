<template>
  <v-app-bar flat style="position: sticky">
    <v-btn
      icon="mdi-menu"
      @click.stop="appState.sidebarVisible = !appState.sidebarVisible"
    />

    <v-app-bar-title>Paper Pie</v-app-bar-title>

    <v-spacer />
    <v-btn
      variant="tonal"
      color="primary"
      @click="notesStore.createNote()"
      prepend-icon="mdi-plus"
      >Note</v-btn
    >

    <v-btn
      icon="mdi-cog-outline"
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
