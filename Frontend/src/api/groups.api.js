import api from "api";

export const allGroups = async (options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().get(`/groups?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getGroup = async (id) => {
  try {
    const response = await api().get(`/groups/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addGroup = async (data) => {
  try {
    const response = await api().post("/groups", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateGroup = async (id, data) => {
  try {
    const response = await api().put(`/groups/${id}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteGroup = async (id, options = {}) => {
  const queries = new URLSearchParams(options).toString();

  try {
    const response = await api().delete(`/groups${id && `/${id}`}?${queries}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
