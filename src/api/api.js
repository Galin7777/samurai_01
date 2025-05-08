import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': '96903f6e-7c99-43f5-8eb7-569b44830df5' },
});

export const usersAPI = {
  getUsers(pageNumber, pageSize) {
    return instance.get(`users?page=${pageNumber}&count=${pageSize}`, {
    })
      .then((response) => response.data); // здесь уже обрабатываем ответ
  },
};

export const authAPI = {
  getHeaders() {
    return instance.get('auth/me')
      .then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)
      .then((response) => response.data);
  },
};

export const followAPI = {
  postFollow(userId) {
    return instance.post(`follow/${userId}`)
      .then((response) => response.data);
  },
  deleteFollow(userId) {
    return instance.delete(`follow/${userId}`)
      .then((response) => response.data);
  },
};
