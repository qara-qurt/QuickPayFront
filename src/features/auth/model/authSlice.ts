import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '@/shared/api'
import { LoginRequest, RegisterRequest, User } from '@/shared/api/auth/types'
import { AuthState } from './types'
import { log } from 'console'

export const registerUser = createAsyncThunk<User, RegisterRequest, { rejectValue: string }>(
    'auth/registerUser',
    async (userData: RegisterRequest, { rejectWithValue }) => {
        try {
            const registerResponse = await authApi.register(userData)
            return {
                id: registerResponse.id,
                username: userData.username,
                name: userData.username,
                surname: userData.surname,
                email: userData.email,
                roles: [],
                is_active: false,
                created_at: '',
                updated_at: '',
                token: '',
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed') as any
        }
    },
)

export const loginUser = createAsyncThunk<User, LoginRequest, { rejectValue: string }>(
    'auth/loginUser',
    async (userData: LoginRequest, { rejectWithValue }) => {
        try {
            const loginResponse = await authApi.login(userData)
            // Сохраняем токен и информацию о пользователе
            return {
                id: loginResponse.user.id,
                username: loginResponse.user.username,
                name: loginResponse.user.name,
                surname: loginResponse.user.surname,
                email: loginResponse.user.email,
                roles: loginResponse.user.roles,
                is_active: loginResponse.user.is_active,
                created_at: loginResponse.user.created_at,
                updated_at: loginResponse.user.updated_at,
                token: loginResponse.token,
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Login failed') as any
        }
    },
)

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    token: '',
}

// Проверяем наличие данных в localStorage при инициализации
const localStorageUser = localStorage.getItem('user')
const localStorageToken = localStorage.getItem('token')

const parsedUser = localStorageUser ? JSON.parse(localStorageUser) : null

const initialStateWithLocalStorage: AuthState = {
    ...initialState,
    user: parsedUser,
    token: localStorageToken || '',
    isAuthenticated: !!localStorageToken,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateWithLocalStorage,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: state => {
            console.log('LOGOUT')
            state.user = null
            state.isAuthenticated = false
            state.token = ''
            localStorage.removeItem('token')
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.loading = false
                console.log('User registered:', action.payload)
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'An error occurred during registration'
                state.loading = false
            })

            .addCase(loginUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.token = action.payload.token
                state.isAuthenticated = true
                state.loading = false
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'An error occurred during login'
                state.loading = false

                localStorage.removeItem('token')
            })
    },
})

export const { logout, login } = authSlice.actions

export default authSlice.reducer
