import axios from 'axios'

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

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
