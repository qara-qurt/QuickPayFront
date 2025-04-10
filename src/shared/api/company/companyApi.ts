import { apiClient } from '../axiosInstance'
import {
    Company,
    CreateRequest,
    CreateResponse,
    GetCompaniesResponse,
    UpdateRequest,
} from './types'

export const companyApi = {
    createCompany: async (data: CreateRequest): Promise<CreateResponse> => {
        const response = await apiClient.post('/organizations', data)
        return response.data
    },
    updateCompany: async (data: UpdateRequest, id: number): Promise<Company> => {
        const response = await apiClient.patch(`/organizations/${id}`, data)
        return response.data
    },
    getCompanies: async (
        page: number,
        limit: number,
        field: string,
        order: string,
        name: string,
    ): Promise<GetCompaniesResponse> => {
        const response = await apiClient.get(
            `/organizations?page=${page}&limit=${limit}&sort=${field}&order=${order}&name=${name}`,
        )
        return response.data
    },
    getCompany: async (): Promise<Company> => {
        const response = await apiClient.get('/users/me')
        return response.data
    },
}
