<template>
  <v-toolbar class="toolbar-row" scroll-behavior="elevate">
    <div class="toolbar-items">
      <v-select
        v-model="selectedNode"
        :items="nodeItems"
        density="compact"
        variant="plain"
        single-line
      ></v-select>

      <v-divider vertical />

      <v-btn-group  density="compact">
        <v-btn
          :active="props.editor.isActive('bold')"
          icon="bi bi-type-bold"
          @click="props.editor.chain().focus().toggleMark('bold').run()"
        />
        <v-btn
          :active="props.editor.isActive('italic')"
          icon="bi bi-type-italic"
          @click="props.editor.chain().focus().toggleMark('italic').run()"
        />
        <v-btn
          :active="props.editor.isActive('underline')"
          icon="bi bi-type-underline"
          @click="props.editor.chain().focus().toggleMark('underline').run()"
        />
        <v-btn
          :active="props.editor.isActive('strikethrough')"
          icon="bi bi-type-strikethrough"
          @click="props.editor.chain().focus().toggleMark('strike').run()"
        />
      </v-btn-group>

      <v-spacer />
    </div>
  </v-toolbar>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps(["editor"]);

const nodeItems = ["Header", "Title", "Subtitle", "Normal"];

const selectedNode = computed(() => {
  if (props.editor?.isActive("heading", { level: 1 })) return "Header";
  if (props.editor?.isActive("heading", { level: 2 })) return "Title";
  if (props.editor?.isActive("heading", { level: 3 })) return "Subtitle";
  else return "Normal";
});
</script>

<style lang="scss" scoped>
.toolbar-row {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background-color: rgba(var(--v-theme-surface), 0.5);

  .toolbar-items {
    max-width: 920px;
    margin: 0 auto;
    flex: 100% 1 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
}
</style>
