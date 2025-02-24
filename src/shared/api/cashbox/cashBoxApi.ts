import { apiClient } from '../axiosInstance'
import { CashBox, CreateRequest, CreateResponse, GetCashBoxResponse, UpdateRequest } from './types'

export const cashBoxApi = {
    createCashBox: async (data: CreateRequest): Promise<CreateResponse> => {
        const response = await apiClient.post('/cash-boxes', data)
        return response.data
    },
    updateCashBox: async (data: UpdateRequest, id: number): Promise<CashBox> => {
        const response = await apiClient.patch(`/cash-boxes/${id}`, data)
        return response.data
    },
    deleteCashBox: async (id: number): Promise<void> => {
        await apiClient.delete(`/cash-boxes/${id}`)
    },
    getCashboxes: async (
        page?: number,
        limit?: number,
        field?: string,
        order?: string,
        name?: string,
        organization_id?: number,
    ): Promise<GetCashBoxResponse> => {
        const response = await apiClient.get(`/cash-boxes`, {
            params: {
                page,
                limit,
                sort: field,
                order,
                name,
                organization_id,
            },
        })
        return response.data
    },
    getCashBox: async (cashbox_id: number): Promise<CashBox> => {
        const response = await apiClient.get(`/cash-box?cashbox_id=${cashbox_id}`)
        return response.data
    },
}
