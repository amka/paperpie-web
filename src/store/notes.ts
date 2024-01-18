// Utilities
import {INote} from "@/models/inote";
import {Note} from "@/models/note";
import {nanoid} from "nanoid";
import {defineStore} from "pinia";

export const useNotesStore = defineStore("notes", {
  persist: true,

  state: () => ({
    notes: [] as INote[],
    currentNote: undefined as INote | undefined,
  }),

  actions: {
    setCurrentNote(noteId: string) {
      const note = this.notes.find((n) => n.noteId == noteId);
      if (note) {
        this.currentNote = note;
      }
      else {
        this.currentNote = undefined
      }
    },
    fetchNotes() {
      try {
        // const notes = JSON.parse(
        //   localStorage.getItem(NOTES_COLLECTION)!
        // ) as INote[];
        // for (const note of notes) {
        //   this.notes.push(
        //     new Note(
        //       note.noteId,
        //       note.title,
        //       note.content,
        //       note.userId,
        //       note.teamId,
        //       note.createdAt,
        //       note.updatedAt
        //     )
        //   );
        // }
        // this.currentNote = this.notes[0];
      } catch (error) {
        console.error(error);
      }
    },

    createNote(title?: string) {
      const note = new Note(nanoid(), title ?? "Untitled note");
      this.notes.push(note);
      this.currentNote = note;
      return note
    },

    deleteNote(noteId: string) {
      const ix = this.notes.findIndex((n) => n.noteId == noteId);
      if (ix > 0) {
        if (this.currentNote?.noteId == noteId) {
          this.currentNote = undefined
        }
        this.notes.splice(ix, 1);
      }
    },
  },
});
