// src/store/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '@/shared/api/auth'
import { LoginRequest, RegisterRequest, User } from '@/shared/api/auth/types'
import { AuthState } from './types'

export const registerUser = createAsyncThunk<User, RegisterRequest, { rejectValue: string }>(
    'auth/registerUser',
    async (userData: RegisterRequest, { rejectWithValue }) => {
        try {
            const registerResponse = await authApi.register(userData)
            return {
                id: registerResponse.id,
                username: userData.username,
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
                token: '', // Изначально токен пустой, его добавим после логина
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed')
        }
    },
)

export const loginUser = createAsyncThunk<User, LoginRequest, { rejectValue: string }>(
    'auth/loginUser',
    async (userData: LoginRequest, { rejectWithValue }) => {
        try {
            const loginResponse = await authApi.login(userData)
            // Сохраняем токен в ответе на логин
            return {
                id: '', // Можно оставить пустым, если id не приходит с токеном
                username: userData.username,
                name: '', // Получим или запросим после логина
                surname: '',
                email: '', // Можно запросить дополнительные данные о пользователе
                token: loginResponse.token, // Сохраняем токен из LoginResponse
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Login failed')
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.user = null
            state.isAuthenticated = false
            state.token = ''
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
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'An error occurred during login'
                state.loading = false
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
