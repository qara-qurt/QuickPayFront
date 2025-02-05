// src/shared/api/auth/api.ts
import { LoginRequest, RegisterRequest, RegisterResponse, LoginResponse, User } from './types'
import { apiClient } from '../axiosInstance'

export const authApi = {
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const response = await apiClient.post('/users/register', data)
        return response.data
    },
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post('/users/login', data)
        return response.data
    },
    getMe: async (): Promise<User> => {
        const response = await apiClient.get('/users/me')
        return response.data
    },
}
