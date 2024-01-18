<template>
  <div class="d-flex flex-column h-100">

    <v-toolbar class="toolbar-row" density="comfortable">
      <v-btn icon="bi bi-layout-sidebar" @click.stop="appState.sidebarVisible = !appState.sidebarVisible"/>
    </v-toolbar>

    <v-container class="d-flex flex-grow-1 align-center justify-center flex-column">
      <v-icon icon="bi bi-journal" size="64"/>
      <h1 class="text-h4 mt-6 mb-4 ">Nothing found</h1>
      <div class="text-h5 mt-6 text-center font-weight-thin">Create your first note</div>
      <div class="text-h6 text-center font-weight-thin">or select one from the sidebar</div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import {useAppStore} from "@/store/app";
const appState = useAppStore();
</script>
