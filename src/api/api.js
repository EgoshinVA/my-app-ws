import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '34623cfe-c2a8-47e3-aaaa-b90c74b71a18',
  },
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  getUnfollow(id) {
    return instance
      .delete(`follow/${id}`, {})
      .then((response) => response.data);
  },

  getFollow(id) {
    return instance.post(`follow/${id}`).then((response) => response.data);
  },
};

export const getProfile = (id) => {
  return instance.get(`profile/${id}`).then((response) => response.data);
};

export const getStatus = (id) => {
  return instance.get(`profile/status/${id}`);
};

export const updateStatus = (status) => {
  return instance.put(`profile/status/`, { status });
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`).then((response) => response.data);
  },

  login(email, password, rememberMe = false) {
    return instance.post(`auth/login/`, { email, password, rememberMe });
  },

  logout() {
    return instance.delete(`auth/login/`);
  },
};
