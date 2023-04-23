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

export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`).then((response) => response.data);
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status});
    },
    updatePhoto(file) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfile(profile) {
        return instance.put(`profile/`, profile);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`).then((response) => response.data);
    },

    login(email, password, rememberMe = false, captcha) {
        return instance.post(`auth/login/`, {email, password, rememberMe, captcha});
    },

    logout() {
        return instance.delete(`auth/login/`);
    },
    getCaptcha() {
        return instance.get(`security/get-captcha-url/`);
    }
};


