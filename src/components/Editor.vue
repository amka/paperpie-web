<template>
  <div id="editor-box">
    <v-text-field v-model="title" :autocapitalize="true" :autofocus="true" class="document-title" placeholder="Title"
                  variant="plain"
                  @change="onTitleChange"
                  @keyup.enter="editor?.commands.focus('start')"/>
    <v-divider class="mb-6"/>
    <editor-content :editor="editor" class="h-100"/>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, PropType,  ref, watch} from "vue";
import {EditorContent, useEditor} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Image from '@tiptap/extension-image';
import {Link} from "@tiptap/extension-link";
import {INote} from "@/models/inote";

const props = defineProps({
  modelValue: {
    type: Object as PropType<INote | undefined>,
  },
});

const emits = defineEmits(["update:modelValue", 'editor-ready']);

const title = ref("");

// Define the initial state of the Editor
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4],
      },
    }),
    Placeholder.configure({
      placeholder: "Write something…",
    }),
    Highlight,
    Typography,
    Link,
    Image.configure({
      HTMLAttributes: {
        class: 'block-image rounded-lg',
      },
    })
  ],
  autofocus: false,
  content: props.modelValue?.content,
  onUpdate: () => {
    if (props.modelValue != undefined) {
      emitUpdate()
    }
  },
  onCreate({editor}) {
    emits('editor-ready', editor)
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
