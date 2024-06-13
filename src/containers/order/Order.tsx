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
import axios from "axios";
import {keepPreviousData, useQuery} from "@tanstack/react-query";


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
    labels: [] as any,
    datasets: [
        {
            label: 'Tổng số tiền mỗi đơn hàng',
            data: [] as any,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const colors = mockLabels.map(() => {
    return randomHexColorWithOpacity();
})
const mockData2 = {
    labels: [] as any,
    datasets: [
        {
            label: 'Tổng số tiền mỗi đơn hàng',
            data: [] as any,
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
    labels: [] as any,
    datasets: [
        {
            label: 'Tỉ lệ trạng thái đơn hàng',
            data: [] as any,
            borderColor: color3.map((data) => data.hexColor),
            backgroundColor: color3.map((data) => data.hexColorWithOpacity),
        },
    ],
};


const selectOptions = productOptions.map((data) => ({
    value: data,
    label: data,
}))

interface ITotalMoneyPerOrder {
    id: number;
    total: number;
    quantity: number;
}

interface ITop10Revenue {
    id: number;
    total: number;
}

interface IOrderStatusRate {
    order_status: EStatusOrder;
    count: number;
}

interface IDataOrder {
    data: {
        totalProfit: number,
        numberOfOrder: number,
        numberOfProductSold: number,
        totalMoneyPerOrder: ITotalMoneyPerOrder[],
        top10Revenue: ITop10Revenue[],
        orderStatusRate: IOrderStatusRate[],
    }
    meta: {
        size: string,
    }
}


export const OrderChart = () => {
    const [data, setData] = useState(mockData1);
    const [data2, setData2] = useState(mockData2);
    const [data3, setData3] = useState(mockData3);

    const [record, setRecord] = useState(totalMoneyMock.length);
    const [maxRecord, setMaxRecord] = useState(totalMoneyMock.length);
    const [selectOption, setSelectOption] = useState<EProductField>(EProductField.NAME);
    const [sortOption, setSortOption] = useState<ESort>(ESort.ASC);
    const [totalMoney, setTotalMoney] = useState<number>(totalMoneyMock.reduce((total: number, curr) => {
        return total + curr.total;
    }, 0));
    const [totalOrder, setTotalOrder] = useState<number>(totalMoneyMock.length);
    const [outputProduct, setOutputProduct] = useState<number>(orderDetailsFullMock.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0))

    const {data: allData, isLoading} = useQuery({
        queryKey: ['order'], queryFn: async () => {
            const {data} = await axios.get<IDataOrder>('http://localhost:4000/api/dashboard/order-summary', {
                params: {
                    size: record,
                }
            })
            return data;
        },
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        if (!allData) return;
        console.log(allData.data)
        setTotalMoney(allData.data.totalProfit);
        setTotalOrder(allData.data.numberOfOrder);
        setOutputProduct(allData.data.numberOfProductSold)
        setData({
            labels: allData.data.totalMoneyPerOrder.map((data) => data.id),
            datasets: [
                {
                    label: 'Tổng số tiền mỗi đơn hàng',
                    data: allData.data.totalMoneyPerOrder.map((data) => data.total),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        })

        const colors = [
            {hexColor: "#4E79A7", hexColorWithOpacity: "rgba(78,121,167,0.5)"},
            {hexColor: "#F28E2B", hexColorWithOpacity: "rgba(242,142,43,0.5)"},
            {hexColor: "#E15759", hexColorWithOpacity: "rgba(225,87,89,0.5)"},
            {hexColor: "#76B7B2", hexColorWithOpacity: "rgba(118,183,178,0.5)"},
            {hexColor: "#59A14F", hexColorWithOpacity: "rgba(89,161,79,0.5)"},
            {hexColor: "#EDC948", hexColorWithOpacity: "rgba(237,201,72,0.5)"},
            {hexColor: "#B07AA1", hexColorWithOpacity: "rgba(176,122,161,0.5)"},
            {hexColor: "#FF9DA7", hexColorWithOpacity: "rgba(255,157,167,0.5)"},
            {hexColor: "#9C755F", hexColorWithOpacity: "rgba(156,117,95,0.5)"},
            {hexColor: "#BAB0AC", hexColorWithOpacity: "rgba(186,176,172,0.5)"},
            {hexColor: "#F1CE63", hexColorWithOpacity: "rgba(241,206,99,0.5)"},
        ]
        setData2({
            labels: allData.data.top10Revenue.map((data) => data.id),
            datasets: [
                {
                    label: 'Doanh thu từng mặt hàng',
                    data: allData.data.top10Revenue.map((data) => data.total),
                    borderColor: colors.map((data) => data.hexColor),
                    backgroundColor: colors.map((data) => data.hexColorWithOpacity),
                },
            ],
        })

        setData3({
            labels: allData.data.orderStatusRate.map((data) => data.order_status),
            datasets: [
                {
                    label: 'Số lượng đơn hàng',
                    data: allData.data.orderStatusRate.map((data) => data.count),
                    borderColor: color3.map((data) => data.hexColor),
                    backgroundColor: color3.map((data) => data.hexColorWithOpacity),
                },
            ],
        })
    }, [allData, record])

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
            {!allData && (<div className={'loading d-flex justify-content-center align-items-center'}>Loading</div>)}

            {allData &&
                <div>
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
            }
        </div>
    </OrderStyle>
}
