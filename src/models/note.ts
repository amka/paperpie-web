import { JSONContent } from "@tiptap/vue-3";
import { INote } from "./inote";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export class Note implements INote {
  noteId: string;
  title?: string;
  content: string | JSONContent;
  userId?: string;
  teamId?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    noteId: string = "",
    title: string | undefined = undefined,
    content: string = "",
    userId: string | undefined = undefined,
    team: string | undefined = undefined,
    createdAt: Date | undefined = undefined,
    updatedAt: Date | undefined = undefined
  ) {
    (this.noteId = noteId),
      (this.title = title),
      (this.content = content),
      (this.userId = userId),
      (this.teamId = team),
      (this.createdAt = createdAt ?? dayjs.utc().toDate()),
      (this.updatedAt = updatedAt ?? dayjs.utc().toDate());
  }
}
