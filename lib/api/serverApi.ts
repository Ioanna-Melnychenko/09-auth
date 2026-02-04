import { Note } from "@/types/note";
import { FetchNotesResponse } from "./clientApi";
import { nextServer } from "./api";


export async function fetchNotes(page: number, searchQuery: string, tag: string) {
    const params = tag ? {
        search: searchQuery,
        page,
        perPage: 12,
        tag
    } : {
        search: searchQuery,
        page,
        perPage: 12, 
    }

    const res = await nextServer.get<FetchNotesResponse>("/notes", { params })
    return res.data;
}

export async function fetchNoteById(id: Note["id"]) {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
}

export async function getMe(){}
export async function checkSession(){}