<template>
  <div id="editor-box">
    <v-text-field v-model="title" :autocapitalize="true" :autofocus="true" variant="plain" placeholder="Title"
                  class="document-title"
                  @change="onTitleChange"/>
    <v-divider class="mb-6" />
    <editor-content :editor="editor" class="h-100"/>
  </div>
</template>

<script lang="ts" setup>
import {EditorContent, useEditor} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";

import {INote} from "@/models/inote";
import {onBeforeUnmount, PropType, ref, watch} from "vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<INote | undefined>,
  },
});

const emits = defineEmits(["update:modelValue"]);

const title = ref("");

// Define the initial state of the Editor
const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: "Write something…",
    }),
    Highlight,
    Typography,
  ],
  autofocus: false,
  content: props.modelValue?.content,
  onUpdate: ({editor}) => {
    if (props.modelValue != undefined) {
      emitUpdate()
    }
  },
});

// Init watcher to update model from the outside
watch(
  () => props.modelValue,
  (newValue: INote | undefined, oldValue: INote | undefined) => {
    if (newValue == undefined) return;

    const isSame = newValue === oldValue;
    if (isSame) {
      return;
    }

    editor.value?.commands.setContent(newValue.content, false);
    title.value = newValue.title ?? "";
    if (!editor.value?.isFocused) {
      editor.value?.commands.focus();
    }
  }
);

const emitUpdate = () => {
  if (editor.value != undefined) {
    const model = props.modelValue!;
    model.content = editor.value!.getJSON();
    model.title = title.value;
    emits("update:modelValue", model);
  }
}

const onTitleChange = (value: string) => {
  emitUpdate()
};

// Cleanup
onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style lang="scss" src="./Editor.vue.scss"/>
