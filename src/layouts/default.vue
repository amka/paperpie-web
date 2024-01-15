<template>
  <v-app>
    <SidebarDrawer />

    <DefaultBar />

    <DefaultView />

    <PreferencesSheet />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./default/AppBar.vue";
import DefaultView from "./default/View.vue";
</script>
