export interface Company {
    id: string
    name: string
    bin: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface CreateRequest {
    name: string
    bin: string
}

export interface CreateResponse {
    id: string
}

export interface UpdateRequest {
    name: string
    bin: string
    is_active: boolean
}

export interface GetCompaniesResponse {
    data: {
        content: Company[]
        pageble: {
            pageNumber: number
            offset: number
        }
        totalPages: number
        totalElements: number
        empty: boolean
    }
}
