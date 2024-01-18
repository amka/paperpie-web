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
          <v-btn
            icon="bi bi-gear"
            @click="appState.showPreferences = true"
          ></v-btn>
        </v-toolbar-items>

      </v-toolbar>

    </template>

    <v-list id="notes-list" :selected="notesStore.currentNote ? [notesStore.currentNote?.noteId] : []" class="px-2">
      <!--      <v-list-subheader>Notes</v-list-subheader>-->
      <template v-for="note in notesStore.notes" :key="note.noteId">
        <v-list-item
          :title="note.title!.length > 0 ? note.title  : 'Untitled Note'"
          :value="note.noteId"
          color="primary"
          density="compact"
          nav
          rounded="rounded"
          @click="onNoteActivate(note)"
          @contextmenu.prevent="(e: MouseEvent) => onMenuActivate(e, note)"
        >
        </v-list-item>
      </template>
    </v-list>

    <v-menu v-model="contextMenuVisible"
            :style="'top: ' + contextMenuY + 'px; left: ' + contextMenuX + 'px'"
            class="rounded-lg"
            min-width="160"
            target="cursor">
      <v-list density="compact" rounded>
        <v-list-item title="Rename" @click="e => { console.log(`rename note ${contextMenuNote?.noteId}`)}"/>
        <v-divider class="mx-4"/>
        <v-list-item class="text-red-darken-4" title="Delete" @click="noteDeleteRequest(contextMenuNote)"/>
      </v-list>
    </v-menu>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useAppStore} from "@/store/app";
import {useNotesStore} from "@/store/notes";
import {INote} from "@/models/inote";

const appState = useAppStore();
const notesStore = useNotesStore();
const router = useRouter();

const contextMenuVisible = ref(false)
const contextMenuNote = ref<INote | undefined>()
const contextMenuX = ref(0)
const contextMenuY = ref(0)

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

/**
 * Activates the menu when an event occurs.
 *
 * @param {MouseEvent} event - The event that triggers the activation of the menu.
 * @param {INote} note - The note associated with the menu.
 */
const onMenuActivate = (event: MouseEvent, note: INote) => {
  contextMenuNote.value = note
  contextMenuVisible.value = true
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY
}

const noteDeleteRequest = (note: INote | undefined) => {
  if (!note) return;
  notesStore.deleteNote(note.noteId)
  if (notesStore.currentNote?.noteId == note.noteId) {
    notesStore.currentNote = undefined
  }
}
</script>

