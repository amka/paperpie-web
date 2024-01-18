<template>

  <div class="toolbar-items">

    <v-select
      v-model="selectedNode"
      :items="nodeItems"
      style="max-width: 260px"
      variant="plain"
    ></v-select>

    <v-divider class="mx-2" inset vertical/>

    <v-btn v-for="mark in markItems"
           :active="props.editor.isActive(mark.name)"
           :icon="mark.icon"
           density="comfortable"
           @click="props.editor.chain().focus().toggleMark(mark.name).run()"
    />

    <v-divider class="mx-2" inset vertical/>

    <v-spacer/>
  </div>

</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps(["editor"]);

const nodeItems = ["Header", "Title", "Subtitle", "Normal"];

const selectedNode = computed(() => {
  if (props.editor?.isActive("heading", {level: 1})) return "Header";
  if (props.editor?.isActive("heading", {level: 2})) return "Title";
  if (props.editor?.isActive("heading", {level: 3})) return "Subtitle";
  else return "Normal";
});

const markItems = [
  {name: 'bold', icon: 'bi bi-type-bold'},
  {name: 'italic', icon: 'bi bi-type-italic'},
  {name: 'underline', icon: 'bi bi-type-underline'},
  {name: 'strike', icon: 'bi bi-type-strikethrough'},
  {name: 'code', icon: 'bi bi-code'},
]
</script>

<style lang="scss" scoped>
.toolbar-items {
  max-width: 920px;
  margin: 0 auto;
  flex: 100% 1 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
