import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register/", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login/", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data));
        // localStorage.setItem("access", JSON.stringify(response.data.access));
        // localStorage.setItem("refresh", JSON.stringify(response.data.reftresh));
      }

      return response.data;
    });
};

const refresh = (refreshToken) => {
  localStorage.removeItem("access");
  return axios
    .post(API_URL + "refresh/", {
      refreshToken
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("access", JSON.stringify(response.data.access));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  // localStorage.removeItem("access");
  // localStorage.removeItem("refresh");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  refresh,
  logout,
  getCurrentUser,
}

export default AuthService;
