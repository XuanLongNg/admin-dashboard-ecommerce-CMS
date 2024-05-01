import {EStatusOrder} from "@/containers/app/enums/app.enum";

export interface IData {
    labels: string[],
    datasets:
        {
            fill: boolean,
            label: any,
            data: any,
            borderColor: any,
            backgroundColor: any,
        }[],
}

export interface IOrder {
    "id": number,
    "user_id": number,
    "status": string,
    "created_at": string,
}

export interface IProcessedOder {
    status: EStatusOrder,
    total: number
}


export interface IReviews {
    id: number,
    user_id: number,
    product_id: number,
    rating: number,
    comment: string,
    status: string,
    created_at: string
    updated_at: string,
    images: string,
}

export interface IInteract {
    review_date: string;
    review_count: number;
}

export interface IProcessedInteract {
    review_date: string;
    total: number;
}

export interface IProcessedReview {
    created_at: string,
    total: number
}

export interface IOrderDetails {
    "id": number,
    "order_id": number,
    "product_id": number,
    "quantity": number,
    "total": number,
    "created_at": string,
    "user_id": number,
    "order_created_at": string,
    "status": string
}

export interface IProcessedOrderStatus {
    status: EStatusOrder,
    total: number
}

export interface IIncomePerProduct {
    productId: number,
    total: number
}
