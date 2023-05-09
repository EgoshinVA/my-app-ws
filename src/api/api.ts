import axios from 'axios';
import {photosType, profileType} from "../redux/profile-reducer";
import {profileInfoFormValuesType} from "../components/Profile/Page/ProfileInfoForm";
import {usersType} from "../redux/users-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '34623cfe-c2a8-47e3-aaaa-b90c74b71a18',
    }
});

type getUsersType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance
            .get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data);
    },
    getUnfollow(id: number) {
        return instance
            .delete<ResponseType>(`follow/${id}`, {})
            .then((response) => response.data);
    },
    getFollow(id: number) {
        return instance.post<ResponseType>(`follow/${id}`).then((response) => response.data);
    }
};

export const profileAPI = {
    getProfile(id: number | null) {
        return instance.get<profileType>(`profile/${id}`).then((response) => response.data);
    },
    getStatus(id: number | null) {
        return instance.get<string>(`profile/status/${id}`);
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, {status});
    },
    updatePhoto(file: any) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<ResponseType<photosType>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => response.data)
    },
    updateProfile(profile: profileInfoFormValuesType) {
        return instance.put<ResponseType>(`profile/`, profile);
    }
}

type MeDataType = {
    id: number
    email: string
    login: string
}
type LoginDataType = {
    userId: number
}
type captchaType = {
    url: string
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeDataType>>(`auth/me`).then((response) => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string) {
        return instance.post<ResponseType<LoginDataType>>(`auth/login/`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login/`);
    },
    getCaptcha() {
        return instance.get<captchaType>(`security/get-captcha-url/`);
    }
};