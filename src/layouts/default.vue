<template>
  <v-app>
    <v-navigation-drawer v-model="appState.sidebarVisible">
      <SidebarDrawer />
    </v-navigation-drawer>

    <DefaultBar />

    <DefaultView />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./default/AppBar.vue";
import DefaultView from "./default/View.vue";
import { useAppStore } from "@/store/app";

const appState = useAppStore();
</script>
