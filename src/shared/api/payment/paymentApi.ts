import { apiClient } from '../axiosInstance'
import { CreatePaymentRequest, CreatePaymentResponse, Payment } from './types'

export const paymentApi = {
    createPayment: async (data: CreatePaymentRequest): Promise<CreatePaymentResponse> => {
        const response = await apiClient.post('/transactions', data)
        return response.data
    },

    getPaymentsByOrganizationAndCashboxIds: async (
        organizationId: number,
        cashboxId?: string,
        page: number = 1,
        limit: number = 20,
    ): Promise<Payment> => {
        const baseUrl = `/transactions?organization_id=${organizationId}&page=${page}&limit=${limit}`
        const url = cashboxId ? `${baseUrl}&cashbox_id=${cashboxId}` : baseUrl
        const response = await apiClient.get(url)
        return response.data
    },
}
