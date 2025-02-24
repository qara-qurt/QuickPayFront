import { User } from '@/shared/api/auth/types'

export interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
    isAuthenticated: boolean
    token: string
}

export const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    token: '',
}
