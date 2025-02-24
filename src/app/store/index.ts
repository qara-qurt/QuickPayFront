import { authSlice } from '@/features/auth/store/authSlice'
import cashBoxesSlice from '@/features/cashbox/store/cashboxSlice'
import productsSlice from '@/features/product/store/productSlice'
import usersSlice from '@/features/user/store/userSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        products: productsSlice.reducer,
        cashBoxes: cashBoxesSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
