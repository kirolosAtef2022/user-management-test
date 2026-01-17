import api from "@/plugins/api";

export const getUsers = () => api.get("/users");

export const getUserById = (id) => api.get(`/users/${id}`);

export const createUser = (data) => api.post("/users", data);

export const updateUser = (id, data) => api.patch(`/users/${id}`, data);

export const toggleBlockUser = (id) => api.patch(`/users/${id}/block`);
