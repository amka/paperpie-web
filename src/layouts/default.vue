<template>
  <v-app>
    <DefaultBar />

    <SidebarDrawer />

    <DefaultView />

    <PreferencesSheet />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./default/AppBar.vue";
import DefaultView from "./default/View.vue";
</script>
