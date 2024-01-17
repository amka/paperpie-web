<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <VLayoutItem position="bottom" class="text-end" size="88">
      <div class="ma-4">
        <VBtn icon="mdi-plus" size="large" color="primary" elevation="8" />
      </div>
    </VLayoutItem>
  </v-app>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { ThemeMode, useAppStore } from './store/app';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { onMounted } from 'vue';

const theme = useTheme()
const appState = useAppStore()

onMounted(() => {
  // Apply theme when app loaded
  theme.global.name.value = appState.themeMode
})

watch(() => appState.themeMode, (newTheme: ThemeMode) => {
  // Set new app theme
  theme.global.name.value = newTheme
})
</script>
