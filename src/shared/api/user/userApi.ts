import { apiClient } from '../axiosInstance'
import {
    CreateRequest,
    CreateResponse,
    GetCompanyUsersResponse,
    GetUserResponse,
    UpdateRequest,
    User,
} from './types'

export const userApi = {
    createUser: async (data: CreateRequest): Promise<CreateResponse> => {
        const response = await apiClient.post('/users/register', data)
        return response.data
    },
    updateUser: async (data: UpdateRequest, id: number): Promise<User> => {
        const response = await apiClient.patch(`/users/${id}`, data)
        return response.data
    },
    deleteUser: async (id: number): Promise<void> => {
        await apiClient.delete(`/users/${id}`)
    },
    getUsers: async (
        page: number,
        limit: number,
        field: string,
        order: string,
        search?: string,
    ): Promise<GetUserResponse> => {
        const response = await apiClient.get('/users', {
            params: {
                page,
                limit,
                sort: field,
                order,
                search,
            },
        })
        return response.data
    },
    getCompanyUsers: async (companyId: number): Promise<GetCompanyUsersResponse> => {
        const response = await apiClient.get(`/organization-users/${companyId}`)
        return response.data
    },
}
