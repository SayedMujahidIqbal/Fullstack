import axios from "axios";
const baseUrl = "/api/blogs";

let token = "";

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const commentBlog = async (id, { comment }) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

const updateBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    blogObject,
    config
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  setToken,
  createBlog,
  commentBlog,
  updateBlog,
  deleteBlog,
};
