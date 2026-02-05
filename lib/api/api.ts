import axios, { AxiosError } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
    withCredentials: true,
    baseURL,
})


export type ApiError = AxiosError<{ error: string }>


