import { apiClient } from '../axiosInstance'
import { CreatePaymentRequest, PaymentResponse } from './types'

export const paymentApi = {
    createPayment: async (data: CreatePaymentRequest): Promise<PaymentResponse> => {
        const response = await apiClient.post('/transactions', data)
        return response.data
    },

    getPaymentsByOrganizationAndCashboxIds: async (
        organizationId: number,
        cashboxId: String | undefined,
    ): Promise<PaymentResponse[]> => {
        const response = await apiClient.get(
            `/transactions?organization_id=${organizationId}&cashbox_id=${cashboxId}`,
        )
        return response.data
    },
}
