import { JSONContent } from "@tiptap/vue-3";

export interface INote {
  noteId: string;
  title?: string;
  content: string | JSONContent;

  userId?: string;
  teamId?: string;

  createdAt: Date;
  updatedAt: Date;
}
