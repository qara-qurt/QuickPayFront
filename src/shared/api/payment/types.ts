import { Product } from '../product/types'

export interface CreatePaymentRequest {
    cashboxId: string
    productIds: number[]
    totalAmount: number
    paymentMethod: string
    organizationId: number
}

export interface CreatePaymentResponse {
    id: number
}

export interface PaymentResponse {
    id: number
    cashboxId: string
    totalAmount: number
    paymentMethod: string
    organizationId: number
    products: Product[]
    created_at: string
}
