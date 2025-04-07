export interface CreatePaymentRequest {
    cashboxId: string
    productIds: number[]
    totalAmount: number
    paymentMethod: string
    organizationId: number
}

export interface PaymentResponse {
    id: number
    cashboxId: string
    totalAmount: number
    paymentMethod: string
    organizationId: number
    createdAt: string
    updatedAt: string
}
