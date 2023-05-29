import api from "api";

export const login = async (email, password) => {
  try {
    const response = await api().post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (data) => {
  try {
    const response = await api().post("/auth/signup", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserByToken = async () => {
  try {
    const response = await api().post("/auth/get-user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
