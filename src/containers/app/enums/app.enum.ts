enum EFilterOption {
    DEFAULT = 'Mặc định',
    DAILY = 'Ngày',
    MONTHLY = 'Tháng',
    YEARLY = 'Năm'
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
    NAME = 'Tên',
    PRICE = 'Giá cả',
    QUANTITY = 'Số lượng nhập',
    VIEWS = 'Số lượt xem'
}

const productOptions = [
    EProductField.NAME,
    EProductField.PRICE,
    EProductField.VIEWS,
    EProductField.QUANTITY
]

enum ERatingField {
    NAME = 'Tên',
    PRICE = 'Giá cả',
    NOR = 'Số lượng đánh giá',
    AVG_RARING = 'Điểm đánh giá trung bình'
}

const ratingOptions = [
    ERatingField.NAME,
    ERatingField.NOR,
    ERatingField.AVG_RARING,
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
