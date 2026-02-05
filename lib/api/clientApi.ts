import { NewNoteContent, Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { CheckSessionRequest } from "./serverApi";



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

export type RegisterRequest = {
  email: string;
  password: string;
};

export async function register(data: RegisterRequest) {
    const res = await nextServer.post<User>('/auth/register', data);
    return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(data: LoginRequest) {
    const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};


export async function checkSession() {
    const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
}
export async function getMe() {
    const { data } = await nextServer.get<User>('/users/me');
    return data;
}

interface UpdateUserRequest {
    username: string
}
export async function updateMe(data: UpdateUserRequest): Promise<User> {
    const res = await nextServer.patch<User>('/users/me', data);
    return res.data;
}