import { apiClient } from '../axiosInstance'
import { CreateAndUpdateRequest, CreateResponse, GetProdutResponse, Product } from './types'

export const productApi = {
    createProduct: async (data: CreateAndUpdateRequest): Promise<CreateResponse> => {
        const response = await apiClient.post('/products', data)
        return response.data
    },
    updateProduct: async (data: CreateAndUpdateRequest, id: number): Promise<Product> => {
        const response = await apiClient.patch(`/products/${id}`, data)
        return response.data
    },
    getProducts: async (
        page?: number,
        limit?: number,
        field?: string,
        order?: string,
        search?: string,
        organization_id?: number,
    ): Promise<GetProdutResponse> => {
        const response = await apiClient.get('/products', {
            params: {
                page,
                limit,
                sort: field,
                order,
                search,
                organization_id,
            },
        })
        return response.data
    },
    deleteProduct: async (id: number): Promise<void> => {
        await apiClient.delete(`/products/${id}`)
    },
}
