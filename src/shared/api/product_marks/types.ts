export interface BindRequest {
    rfid_tags: string[]
    product_id: number
}

export interface GetMarksResponse {
    [key: string]: string
}

export interface Response {
    message: string
}
