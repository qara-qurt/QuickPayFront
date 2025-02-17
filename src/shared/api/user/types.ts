export interface User {
    id: number
    name: string
    surname: string
    username: string
    email: string
    password: null
    roles: string[]
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface CreateRequest {
    name: string
    surname: string
    username: string
    email: string
    password: string
    roles: string[]
}

export interface UpdateRequest {
    name: string
    surname: string
    username: string
    email: string
    roles: string[]
}

export interface CreateResponse {
    id: string
}

export interface GetUserResponse {
    data: {
        content: User[]
        pageble: {
            pageNumber: number
            offset: number
        }
        totalPages: number
        totalElements: number
        empty: boolean
    }
}
