<template>
  <v-bottom-sheet inset class="rounded" v-model="appState.showPreferences">
    <v-card class="pt-8">
      <v-radio-group label="Theme" v-model="appState.themeMode">
        <v-radio v-for="mode in ThemeMode" :key="mode" :label="mode" :value="mode" class="text-capitalize" />
      </v-radio-group>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { useNotesStore } from "@/store/notes";
import { ThemeMode, useAppStore } from "@/store/app";

const appState = useAppStore();
</script>
