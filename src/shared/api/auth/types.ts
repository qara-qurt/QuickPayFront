export interface User {
    id: string
    username: string
    name: string
    surname: string
    email: string
    token: string
}

export interface RegisterRequest {
    email: string
    password: string
    username: string
    name: string
    surname: string
}

export interface RegisterResponse {
    id: string
}

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    token: string
}
