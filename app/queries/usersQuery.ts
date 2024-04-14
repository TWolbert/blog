import axios, { AxiosResponse } from "axios";

interface UsersResponse {
    users: User[];
}

export async function getUsers(): Promise<UsersResponse> {
    const { data } = await axios.get("/api/users");
    return data;
}