export interface CashBox {
    id: string
    name: string
    cashbox_id: string
    is_active: boolean
    organization_id: number
    created_at: string
    updated_at: string
}

export interface CreateRequest {
    cashbox_id: string
    name: string
    organization_id: number
}

export interface CreateResponse {
    id: string
}

export interface GetCashBoxResponse {
    data: {
        content: CashBox[]
        pageble: {
            pageNumber: number
            offset: number
        }
        totalPages: number
        totalElements: number
        empty: boolean
    }
}

export interface UpdateRequest {
    name: string
    is_active: boolean
}
