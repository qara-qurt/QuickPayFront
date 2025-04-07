import { apiClient } from '../axiosInstance'
import { CreatePaymentRequest, PaymentResponse } from './types'

export const paymentApi = {
    createPayment: async (data: CreatePaymentRequest): Promise<PaymentResponse> => {
        const response = await apiClient.post('/transactions', data)
        return response.data
    },

    getPaymentsByOrganization: async (organizationId: number): Promise<PaymentResponse[]> => {
        const response = await apiClient.get('/transactions', {
            params: { organizationId },
        })
        return response.data
    },
}
