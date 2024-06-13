enum EFilterOption {
    DEFAULT = 'default',
    DAILY = 'daily',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
}

const filterOptions: EFilterOption[] = [EFilterOption.DEFAULT, EFilterOption.DAILY, EFilterOption.MONTHLY, EFilterOption.YEARLY]


enum EStatusOrder {
    COMPLETE = 'complete', //2
    PENDING = "pending", //1
    PROCESSING = "processing", //3
}

const statusOrders = [
    EStatusOrder.COMPLETE,
    EStatusOrder.PENDING,
    EStatusOrder.PROCESSING,
]

enum EStatisticalOption {
    PRODUCT = 'Mặt hàng',
    RATING = 'Đánh giá',
    ORDER = 'Đơn hàng'
}

enum EProductField {
    NAME = 'name',
    PRICE = 'price',
    QUANTITY = 'quantity',
    VIEWS = 'views',
}


const productOptions = [
    EProductField.NAME,
    EProductField.PRICE,
    EProductField.VIEWS,
    EProductField.QUANTITY
]

enum ERatingField {
    NAME = 'name',
    PRICE = 'price',
    COMMENT_COUNT = 'commentCount',
    AVG_RATING = 'avgRating',
}

const ratingOptions = [
    ERatingField.NAME,
    ERatingField.COMMENT_COUNT,
    ERatingField.AVG_RATING,
    ERatingField.PRICE
]

export {
    EFilterOption,
    filterOptions,
    EStatusOrder,
    statusOrders,
    EStatisticalOption,
    EProductField,
    productOptions,
    ERatingField,
    ratingOptions
}
