<template>
  <editor-content :editor="editor" class="h-100" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Blockquote from "@tiptap/extension-blockquote";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";

import { INote } from "../models/inote";
import { PropType, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<INote | undefined>,
  },
});

const emits = defineEmits(["update:modelValue"]);

// Define the initial state of the Editor
const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: "Write something…",
    }),
    Blockquote.configure({
      HTMLAttributes: {
        class: "paper-blockquote",
      },
    }),
    Highlight,
    Typography,
  ],
  autofocus: true,
  injectCSS: false,
  content: props.modelValue?.content,
  onUpdate: ({ editor }) => {
    if (props.modelValue != undefined) {
      const model = props.modelValue!;
      model.content = editor.getJSON();
      emits("update:modelValue", model);
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
    if (!editor.value?.isFocused) {
      editor.value?.commands.focus();
    }
  }
);

// Cleanup
onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style lang="scss" src="./Editor.vue.scss" />
