export interface Product {
    id: number
    name: string
    price: number
    sizes: string[]
    colors: string[]
    image: string
    description: string
    organization_id: number
    created_at: string
    updated_at: string
}

export interface CreateAndUpdateRequest {
    name: string
    price: number
    sizes: string[]
    colors: string[]
    image: string
    description: string
    organization_id: number
}

export interface CreateResponse {
    id: string
}

export interface GetUProdutResponse {
    data: {
        content: Product[]
        pageble: {
            pageNumber: number
            offset: number
        }
        totalPages: number
        totalElements: number
        empty: boolean
    }
}
