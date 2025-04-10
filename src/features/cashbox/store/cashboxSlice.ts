import { RootState } from '@/app/store'
import { cashBoxApi } from '@/shared/api'
import { CashBox } from '@/shared/api/cashbox/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface CashBoxesState {
    data: CashBox[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: CashBoxesState = {
    data: [],
    status: 'idle',
    error: null,
}

export const fetchCashBoxes = createAsyncThunk(
    'cashBoxes/fetch',
    async (organization_id: number, { rejectWithValue }) => {
        try {
            const response = await cashBoxApi.getCashboxes(
                1,
                10,
                'updatedAt',
                'desc',
                undefined,
                organization_id,
            )
            return response.data.content
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    },
)

// Slice
const cashBoxesSlice = createSlice({
    name: 'cashBoxes',
    initialState,
    reducers: {
        resetCashBoxesState: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCashBoxes.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchCashBoxes.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchCashBoxes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const { resetCashBoxesState } = cashBoxesSlice.actions
export default cashBoxesSlice
export const selectCashBoxes = (state: RootState) => state.cashBoxes
