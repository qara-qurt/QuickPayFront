import { apiClient } from '../axiosInstance'
import { BindRequest, GetMarksResponse } from './types'

export const productMarkApi = {
    bindMarkToProduct: async (data: BindRequest): Promise<Response> => {
        const response = await apiClient.post('/rfid/bind', data)
        return response.data
    },
    getMarksByProductId: async (productId: number): Promise<GetMarksResponse> => {
        const response = await apiClient.get(`/rfid/${productId}/rfid-tags`)
        return response.data
    },
    deleteMarkFromProduct: async (productId: number, rfidTag: string): Promise<void> => {
        await apiClient.delete(`/rfid/${productId}/rfid-tags/${rfidTag}`)
    },
}
