import { Note } from "@/types/note";
import { FetchNotesResponse } from "./clientApi";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { cookies } from 'next/headers';


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

export async function getServerMe() {
    const cookieStore = await cookies();
    const { data } = await nextServer.get<User>('/users/me', { 
        headers: {
            Cookie: cookieStore.toString()
        }
    });
  return data;
}

export type CheckSessionRequest = {
  success: boolean;
};



export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};


