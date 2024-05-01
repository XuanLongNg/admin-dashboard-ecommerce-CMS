import {
    IIncomePerProduct,
    IInteract,
    IOrder,
    IOrderDetails, IProcessedInteract,
    IProcessedOder, IProcessedOrderStatus,
    IProcessedReview,
    IReviews
} from "@/containers/app/interfaces/app.interface";
import {EFilterOption, EStatusOrder} from "@/containers/app/enums/app.enum";

const transformDataOrderDetails = (data: IOrderDetails[]) => {
    // if (option === EFilterOption.DEFAULT) {
    //     return data;
    // }
    return data.reduce((acc: IProcessedOrderStatus[], curr) => {
        // let createdAt;
        // switch (option) {
        //     case EFilterOption.DAILY:
        //         createdAt = curr.created_at.split(' ')[0];
        //         break;
        //     case EFilterOption.MONTHLY:
        //         createdAt = curr.created_at.slice(0, 7);
        //         break;
        //     case EFilterOption.YEARLY:
        //         createdAt = curr.created_at.slice(0, 4);
        //         break;
        //     default:
        //         createdAt = curr.created_at;
        //         break;
        // }
        const existingRecord = acc.findIndex(item => item.status === curr.status);

        if (existingRecord != -1) {
            acc[existingRecord] = {
                status: acc[existingRecord].status,
                total: acc[existingRecord].total + 1
            }
        } else {
            acc.push({
                status: curr.status as EStatusOrder,
                total: 1
            });
        }

        return acc;
    }, []);
}


const transformDataOrder = (data: IOrderDetails[]) => {
    return data.reduce((acc: IIncomePerProduct[], curr) => {
        const existingRecord = acc.findIndex(item => item.productId === curr.product_id);

        if (existingRecord != -1) {
            acc[existingRecord] = {
                productId: acc[existingRecord].productId,
                total: acc[existingRecord].total + curr.total
            }
        } else {
            acc.push({productId: curr.product_id, total: curr.total});
        }

        return acc;
    }, []);
}

const transformDataInteract = (data: IReviews[], option: EFilterOption) => {
    return data.reduce((acc: IProcessedReview[], curr) => {
        let created_at;
        switch (option) {
            case EFilterOption.DAILY:
                created_at = curr.created_at.split(' ')[0];
                break;
            case EFilterOption.MONTHLY:
                created_at = curr.created_at.slice(0, 7);
                break;
            case EFilterOption.YEARLY:
                created_at = curr.created_at.slice(0, 4);
                break;
            default:
                created_at = curr.created_at.slice(0, 13);
                break;
        }
        const existingRecord = acc.findIndex(item => item.created_at === created_at);

        if (existingRecord != -1) {
            acc[existingRecord] = {created_at: acc[existingRecord].created_at, total: acc[existingRecord].total + 1}
        } else {
            acc.push({created_at: created_at, total: 1} as IProcessedReview);
        }

        return acc;
    }, []);
}

export {
    transformDataOrder,
    transformDataOrderDetails,
    transformDataInteract
}
