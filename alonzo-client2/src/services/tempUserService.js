import axios from "axios";
import constants from "../constants";

const API = axios.create({
    baseURL: `${constants.HOST}/users`,
});

// FETCH USERS
export const fetchUsers = () => API.get("/");

// CREATE USER
export const createUser = (user) => API.post("/", user);

// UPDATE USER
export const updateUser = (id, user) =>
    API.put(`/${id}`, user);

// DELETE USER
export const deleteUser = (id) =>
    API.delete(`/${id}`);

// LOGIN USER
export const loginUser = (credentials) =>
    API.post("/login", credentials);
