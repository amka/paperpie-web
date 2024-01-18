<template>
  <v-navigation-drawer
    v-model="appState.sidebarVisible"
    class="custom-scrollbar"
    style="position: fixed"
  >

    <template v-slot:prepend>
      <v-toolbar density="comfortable" scroll-behavior="elevate" style="position: sticky">
        <v-toolbar-title class="mx-4">Paper Pie</v-toolbar-title>

        <v-toolbar-items>
          <v-btn
            color="primary"
            icon="bi bi-file-earmark-plus-fill"
            @click="onNoteCreate"
          />
        </v-toolbar-items>
        <!--        <v-btn-->
        <!--          icon="bi bi-gear"-->
        <!--          @click="appState.showPreferences = true"-->
        <!--        ></v-btn>-->

      </v-toolbar>

    </template>

    <div class="text-overline px-4">Notes</div>
    <v-list :selected="notesStore.currentNote ? [notesStore.currentNote?.noteId] : []" class="px-2">
      <!--      <v-list-subheader>Notes</v-list-subheader>-->
      <template v-for="note in notesStore.notes" :key="note.noteId">
        <v-list-item
          :title="note.title!.length > 0 ? note.title  : 'Untitled Note'"
          :value="note.noteId"
          color="primary"
          density="compact"
          nav
          rounded="rounded"
          @click="notesStore.currentNote = note"
        >
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useAppStore} from "@/store/app";
import {useNotesStore} from "@/store/notes";
import {INote} from "@/models/inote";

const appState = useAppStore();
const notesStore = useNotesStore();
const router = useRouter();

onMounted(async () => {
  notesStore.fetchNotes();
});

const onNoteCreate = () => {
  const note = notesStore.createNote()
  router.push('/n/' + note.noteId)
}

const onNoteActivate = (note: INote) => {
  router.push('/n/' + note.noteId)
  notesStore.currentNote = note
}

const onMenuActivate = (event: MouseEvent) => {
  console.log(event)
}
</script>

