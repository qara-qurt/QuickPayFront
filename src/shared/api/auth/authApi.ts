// src/shared/api/auth/api.ts
import axios from 'axios'
import { LoginRequest, RegisterRequest, RegisterResponse, LoginResponse } from './types'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

// Добавим интерсептор для автоматической отправки токена в запросах
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token') // Получаем токен из localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}` // Добавляем токен в заголовки
        }
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

export const authApi = {
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const response = await apiClient.post('/users/register', data)
        return response.data
    },
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post('/users/login', data)
        return response.data
    },
}
