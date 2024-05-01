import totalMoneyMock from '@/mock/total_money_per_order.json'
import orderDetailsFullMock from '@/mock/order_details_full.json'
import React, {useEffect, useState} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2';
import {FilterComponent} from "@/containers/filter/Filter";
import {
    EFilterOption,
    EProductField,
    EStatusOrder,
    productOptions,
    statusOrders
} from "@/containers/app/enums/app.enum";
import {ESort} from "@/common/enums/sort.enum";
import {PointCart} from "@/containers/point-card/PointCart";
import {OrderStyle} from "@/containers/order/order.style";
import {transformDataOrder, transformDataOrderDetails} from "@/containers/app/utils/transform-data.utils";
import {randomHexColorWithOpacity} from "@/common/utils/randomColor.utils";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options1 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            position: 'bottom' as const,
            text: 'Bảng thống kê nhập xuất hàng',
        },
    },
};

export const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            position: 'bottom' as const,
            text: 'Doanh thu từng mặt hàng',
        },
    },
};
export const options3 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            position: 'bottom' as const,
            text: 'Tỉ lệ trạng thái đơn hàng',
        },
    },
};

const mockLabels = totalMoneyMock.map((data) => data.order_id);
const mockData1 = {
    labels: mockLabels,
    datasets: [
        {
            label: 'Tổng số tiền mỗi đơn hàng',
            data: totalMoneyMock.map((data) => data.total),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const colors = mockLabels.map(() => {
    return randomHexColorWithOpacity();
})
const mockData2 = {
    labels: mockLabels,
    datasets: [
        {
            label: 'Tổng số tiền mỗi đơn hàng',
            data: totalMoneyMock.map((data) => data.total),
            borderColor: colors.map((data) => data.hexColor),
            backgroundColor: colors.map((data) => data.hexColorWithOpacity),
        },
    ],
};

const color3 = [
    {
        hexColor: "#0072F0",
        hexColorWithOpacity: "rgba(0,114,240,0.5)"
    },
    {
        hexColor: "#00B6CB",
        hexColorWithOpacity: "rgba(0,182,203,0.5)"
    },
    {
        hexColor: "#FF7043",
        hexColorWithOpacity: "rgba(255,112,67,0.5)"
    }
]

const mockData3 = {
    labels: statusOrders,
    datasets: [
        {
            label: 'Tỉ lệ trạng thái đơn hàng',
            data: totalMoneyMock.map((data) => data.total),
            borderColor: color3.map((data) => data.hexColor),
            backgroundColor: color3.map((data) => data.hexColorWithOpacity),
        },
    ],
};


const selectOptions = productOptions.map((data) => ({
    value: data,
    label: data,
}))

export const OrderChart = () => {
    const [data, setData] = useState(mockData1);
    const [data2, setData2] = useState(mockData2);
    const [data3, setData3] = useState(mockData3);

    const [filterOption, setFilterOption] = useState<EFilterOption>(EFilterOption.DEFAULT)
    const [record, setRecord] = useState(totalMoneyMock.length);
    const [maxRecord, setMaxRecord] = useState(totalMoneyMock.length);
    const [selectOption, setSelectOption] = useState<EProductField>(EProductField.NAME);
    const [sortOption, setSortOption] = useState<ESort>(ESort.ACS);
    const [totalMoney, setTotalMoney] = useState<number>(totalMoneyMock.reduce((total: number, curr) => {
        return total + curr.total;
    }, 0));
    const [totalOrder, setTotalOrder] = useState<number>(totalMoneyMock.length);
    const [outputProduct, setOutputProduct] = useState<number>(orderDetailsFullMock.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0))

    useEffect(() => {
        const mock = [...totalMoneyMock.sort()];
        const length = mock.length;
        setMaxRecord(length);
        let dataTmp;
        dataTmp = mock.sort()

        // switch (selectOption) {
        //     case EProductField.NAME:
        //         dataTmp = mock.sort((a, b) => {
        //             if (sortOption === ESort.ACS)
        //                 return a.name.localeCompare(b.name);
        //             return b.name.localeCompare(a.name);
        //         })
        //         break;
        //     case EProductField.PRICE:
        //         dataTmp = mock.sort((a, b) => {
        //             if (sortOption === ESort.ACS)
        //                 return a.price - b.price
        //             return b.price - a.price
        //         })
        //         break;
        //     case EProductField.QUANTITY:
        //         dataTmp = mock.sort((a, b) => {
        //             if (sortOption === ESort.ACS)
        //                 return a.quantity - b.quantity
        //             return b.quantity - a.quantity
        //         })
        //         break;
        //     case EProductField.VIEWS:
        //         dataTmp = mock.sort((a, b) => {
        //             if (sortOption === ESort.ACS)
        //                 return a.views - b.views
        //             return b.views - a.views
        //         })
        //         break;
        //     default:
        //         dataTmp = mock.sort()
        //         break;
        // }

        let dataProcessed = dataTmp.slice(record > length ? 0 : length - record, length);
        let dataProcessed2 = transformDataOrder([...orderDetailsFullMock]);
        let dataProcessed3 = transformDataOrderDetails([...orderDetailsFullMock]).sort((a, b) => {
            const aEnumValue = EStatusOrder[a.status.toUpperCase() as keyof typeof EStatusOrder];
            const bEnumValue = EStatusOrder[b.status.toUpperCase() as keyof typeof EStatusOrder];

            if (aEnumValue < bEnumValue) {
                return -1;
            }
            if (aEnumValue > bEnumValue) {
                return 1;
            }
            return 0;
        });

        setData({
            labels: dataProcessed.map((data) => data.order_id),
            datasets: [
                {
                    label: 'Tổng số tiền mỗi đơn hàng',
                    data: totalMoneyMock.map((data) => data.total),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        })
        const colors = dataProcessed2.map(() => {
            return randomHexColorWithOpacity();
        })
        setData2({
            labels: dataProcessed2.map((data) => data.productId),
            datasets: [
                {
                    label: 'Doanh thu từng mặt hàng',
                    data: dataProcessed2.map((data) => data.total),
                    borderColor: colors.map((data) => data.hexColor),
                    backgroundColor: colors.map((data) => data.hexColorWithOpacity),
                },
            ],
        })

        setData3({
            labels: statusOrders,
            datasets: [
                {
                    label: 'Số lượng đơn hàng',
                    data: dataProcessed3.map((data) => data.total),
                    borderColor: color3.map((data) => data.hexColor),
                    backgroundColor: color3.map((data) => data.hexColorWithOpacity),
                },
            ],
        })
    }, [record, filterOption, selectOption, sortOption])

    const handleSelect = (value: any) => {
        setSelectOption(value)
    }

    const handleSort = (value: any) => {
        setSortOption(value)
    }

    return <OrderStyle>
        <div className={'left-component'}>
            <FilterComponent
                maxRecord={maxRecord}
                record={record}
                setRecord={setRecord}
                hasFilterOption={false}
                selectOption={selectOption}
                selectOptions={selectOptions}
                handleSelect={handleSelect}
                hasSelectOption={false}
                handleSort={handleSort}
                sortSelect={sortOption}
            />
            <div className={'d-flex flex-row'}>
                <div className={"d-flex align-items-end chart-1"}>
                    <Bar options={options1} data={data}/>
                </div>
                <div className={'d-flex flex-column right-component'}>
                    <PointCart className={"card-order"} title={'Tổng doanh thu'} content={totalMoney}/>
                    <PointCart className={"card-order"} title={'Số lượng đơn hàng'} content={totalOrder}/>
                    <PointCart className={"card-order"} title={'Số lượng hàng dã bán'} content={outputProduct}/>
                </div>
            </div>
            <div className={"chart-2 d-flex flex-row"}>
                <div className={'pie-chart-1'}>
                    <Pie data={data2} options={options2}/>
                </div>
                <div className={'pie-chart-2'}>
                    <Pie data={data3} options={options3}/>
                </div>
            </div>
        </div>
    </OrderStyle>
}
