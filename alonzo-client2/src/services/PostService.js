import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/posts`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchPosts = () => API.get("/");
export const createPost = (post) => API.post("/", post);
export const createReply = (postId, reply) =>
  API.post(`/${postId}/replies`, reply);
export const deletePost = (postId) => API.delete(`/${postId}`);
export const deleteReply = (postId, replyId) =>
  API.delete(`/${postId}/replies/${replyId}`);