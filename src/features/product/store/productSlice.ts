import { RootState } from '@/app/store'
import { productApi } from '@/shared/api/product/productApi'
import { Product } from '@/shared/api/product/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface ProductsState {
    data: Product[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: ProductsState = {
    data: [],
    status: 'idle',
    error: null,
}

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async (organization_id: number, { rejectWithValue }) => {
        try {
            const response = await productApi.getProducts(
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

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProductsState: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const { resetProductsState } = productsSlice.actions
export default productsSlice
export const selectProducts = (state: RootState) => state.products
