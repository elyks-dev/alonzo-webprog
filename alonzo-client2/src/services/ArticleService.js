import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchArticles = () => API.get("/");

export const fetchMyArticles = () => API.get("/mine");

export const createArticle = (article) =>
  API.post("/", article, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateArticle = (id, article) =>
  API.put(`/${id}`, article, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteArticle = (id) => API.delete(`/${id}`);