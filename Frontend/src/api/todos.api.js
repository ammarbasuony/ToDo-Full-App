import api from "api";

export const allToDos = async (options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().get(`/todos?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getToDo = async (id) => {
  try {
    const response = await api().get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addToDo = async (data) => {
  try {
    const response = await api().post("/todos", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateToDo = async (id, data) => {
  try {
    const response = await api().put(`/todos/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteToDo = async (id) => {
  try {
    const response = await api().delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteToDoPermenantly = async (id, options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().delete(`/todos/delete/${id}?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
