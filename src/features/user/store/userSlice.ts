import { RootState } from '@/app/store'
import { User } from '@/shared/api/user/types'
import { userApi } from '@/shared/api/user/userApi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface UsersState {
    data: User[]
    organization: any
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

// Начальное состояние
const initialState: UsersState = {
    data: [],
    organization: null,
    status: 'idle',
    error: null,
}

// Thunk для загрузки сотрудников
export const fetchEmployees = createAsyncThunk(
    'employees/fetch',
    async (organization_id: number, { rejectWithValue }) => {
        try {
            const response = await userApi.getCompanyUsers(organization_id)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    },
)

// Slice
const usersSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        resetEmployeesState: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchEmployees.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload.users
                state.organization = action.payload.organization
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const { resetEmployeesState } = usersSlice.actions
export default usersSlice
export const selectEmployees = (state: RootState) => state.users
