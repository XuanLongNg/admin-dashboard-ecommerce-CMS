import productMock from '@/mock/thong_ke_product.json'
import React, {useEffect, useState} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {FilterComponent} from "@/containers/filter/Filter";
import {EFilterOption, EProductField, productOptions} from "@/containers/app/enums/app.enum";
import {ProductStyle} from "@/containers/product/product.style";
import {ESort} from "@/common/enums/sort.enum";
import {PointCart} from "@/containers/point-card/PointCart";
import axios from "axios";
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options1 = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
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
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Bảng thống kê lượt xem mặt hàng',
        },

    },
    scales: {
        y: {
            display: true,
            position: 'left' as const,
        },
        y1: {
            display: true,
            position: 'right' as const,
        },
    },
};

const mockData1 = {
    labels: [] as any,
    datasets: [
        {
            label: 'Số lượng nhập về',
            data: [] as any,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Số lượng bán ra',
            data: [] as any,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const mockData2 = {
    labels: [] as any,
    datasets: [
        {
            label: 'Lượt xem',
            data: [] as any,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
        },
        {
            label: 'Giá cả',
            data: [] as any,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1',
        },
    ],
};

const selectOptions = productOptions.map((data) => ({
    value: data,
    label: data,
}))

interface IIOProduct {
    label: string
    input: number
    output: number
}

interface IViewProduct {
    label: string
    views: number
    price: number
}

interface IDataProduct {
    data: {
        IOProduct: IIOProduct[],
        ViewProduct: IViewProduct[],
        totalProduct: number,
        totalProductSold: number
    }
    meta: {
        orderBy: string,
        order: string,
        size: string,
    }
}


export const ProductChart = () => {

    const [data, setData] = useState(mockData1);
    const [data2, setData2] = useState(mockData2);

    const [filterOption, setFilterOption] = useState<EFilterOption>(EFilterOption.DEFAULT)
    const [record, setRecord] = useState(productMock.length);
    const [maxRecord, setMaxRecord] = useState(productMock.length);
    const [selectOption, setSelectOption] = useState<EProductField>(EProductField.NAME);
    const [sortOption, setSortOption] = useState<ESort>(ESort.ASC);
    const [totalProduct, setTotalProduct] = useState<number>(0);
    const [totalProductSold, setTotalProductSold] = useState<number>(0);

    const {data: allData, isLoading} = useQuery({
        queryKey: ['product'], queryFn: async () => {
            const {data} = await axios.get<IDataProduct>('http://localhost:4000/api/dashboard/product-summary', {
                params: {
                    size: record,
                    order: sortOption,
                    orderBy: selectOption,
                }
            })
            return data;
        },
        placeholderData: keepPreviousData
    })
    useEffect(() => {
        if (!allData) return;
        setData({
            labels: allData.data.IOProduct.map((data) => data.label),
            datasets: [
                {
                    label: 'Số lượng nhập về',
                    data: allData.data.IOProduct.map((data) => data.input),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Số lượng bán ra',
                    data: allData.data.IOProduct.map((data) => data.output),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        })
        setData2({
            labels: allData.data.ViewProduct.map((data) => data.label),
            datasets: [
                {
                    label: 'Lượt xem',
                    data: allData.data.ViewProduct.map((data) => data.views),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                },
                {
                    label: 'Giá cả',
                    data: allData.data.ViewProduct.map((data) => data.price),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y1',
                },
            ],
        })
        setTotalProduct(allData.data.totalProduct);
        setTotalProductSold(allData.data.totalProductSold);
    }, [allData, record, filterOption, selectOption, sortOption])

    const handleSelect = (value: any) => {
        setSelectOption(value)
    }

    const handleSort = (value: any) => {
        setSortOption(value)
    }

    return <ProductStyle>
        <div className={'left-component'}>
            <FilterComponent
                maxRecord={maxRecord}
                record={record}
                setRecord={setRecord}
                hasFilterOption={false}
                selectOption={selectOption}
                selectOptions={selectOptions}
                handleSelect={handleSelect}
                handleSort={handleSort}
                sortSelect={sortOption}
                hasSelectOption={true}
            />
            {!allData && (<div className={'loading d-flex justify-content-center align-items-center'}>Loading</div>)}

            {allData && <div>
                <div className={'d-flex flex-row'}>
                    <PointCart title={'Tổng số lượng hàng trong kho'} content={totalProduct}/>
                    <PointCart title={'Tổng số lượng hàng đã bán'} content={totalProductSold}/>
                </div>
                <div className={"chart-1"}>
                    <Bar options={options1} data={data}/>
                </div>
                <div className={"chart-2"}>
                    <Bar options={options2} data={data2}/>
                </div>
            </div>}
        </div>
    </ProductStyle>
}
