import { NewNoteContent, Note } from "@/types/note";
import { nextServer } from "./api";


export  interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

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


export async function createNote(newNote: NewNoteContent) {
    const res = await nextServer.post<Note>("/notes", newNote);
    return res.data;
}

export async function deleteNote(id: Note["id"]) {
    const res = await nextServer.delete<Note>(`/notes/${id}`);
    return res.data;
}

export async function fetchNoteById(id: Note["id"]) {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
}

export async function register(){}
export async function login(){}
export async function logout(){}
export async function checkSession(){}
export async function getMe(){}
export async function updateMe(){}