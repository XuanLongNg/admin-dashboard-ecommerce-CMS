import productMock from '@/mock/thong_ke_product.json'
import React, {useEffect, useState} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {FilterComponent} from "@/containers/filter/Filter";
import {EFilterOption, EProductField, productOptions} from "@/containers/app/enums/app.enum";
import {ProductStyle} from "@/containers/product/product.style";
import {ESort} from "@/common/enums/sort.enum";
import {PointCart} from "@/containers/point-card/PointCart";


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

const mockLabels = productMock.map((data) => data.name);
const mockData1 = {
    labels: mockLabels,
    datasets: [
        {
            label: 'Số lượng nhập về',
            data: productMock.map((data) => data.quantity),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Số lượng bán ra',
            data: productMock.map((data) => data.output),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const mockData2 = {
    labels: mockLabels,
    datasets: [
        {
            label: 'Lượt xem',
            data: productMock.map((data) => data.views),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
        },
        {
            label: 'Giá cả',
            data: productMock.map((data) => data.price),
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

export const ProductChart = () => {
    const [data, setData] = useState(mockData1);
    const [data2, setData2] = useState(mockData2);

    const [filterOption, setFilterOption] = useState<EFilterOption>(EFilterOption.DEFAULT)
    const [record, setRecord] = useState(productMock.length);
    const [maxRecord, setMaxRecord] = useState(productMock.length);
    const [selectOption, setSelectOption] = useState<EProductField>(EProductField.NAME);
    const [sortOption, setSortOption] = useState<ESort>(ESort.ACS);
    const [totalProduct, setTotalProduct] = useState<number>(productMock.reduce((total: number, curr) => {
        return total + curr.quantity;
    }, 0));


    useEffect(() => {
        const mock = [...productMock.sort()];
        const length = mock.length;
        setMaxRecord(length);
        let dataTmp;

        switch (selectOption) {
            case EProductField.NAME:
                dataTmp = mock.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.name.localeCompare(b.name);
                    return b.name.localeCompare(a.name);
                })
                break;
            case EProductField.PRICE:
                dataTmp = mock.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.price - b.price
                    return b.price - a.price
                })
                break;
            case EProductField.QUANTITY:
                dataTmp = mock.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.quantity - b.quantity
                    return b.quantity - a.quantity
                })
                break;
            case EProductField.VIEWS:
                dataTmp = mock.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.views - b.views
                    return b.views - a.views
                })
                break;
            default:
                dataTmp = mock.sort()
                break;
        }

        let dataProcessed = dataTmp.slice(record > length ? 0 : length - record, length);

        setData({
            labels: dataProcessed.map((data) => data.name),
            datasets: [
                {
                    label: 'Số lượng nhập về',
                    data: dataProcessed.map((data) => data.quantity),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Số lượng bán ra',
                    data: dataProcessed.map((data) => data.output),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        })
        setData2({
            labels: dataProcessed.map((data) => data.name),
            datasets: [
                {
                    label: 'Lượt xem',
                    data: dataProcessed.map((data) => data.views),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                },
                {
                    label: 'Giá cả',
                    data: dataProcessed.map((data) => data.price),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y1',
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
            <div className={'d-flex flex-row'}>
                <PointCart title={'Tổng số lượng hàng trong kho'} content={totalProduct}/>
                <PointCart title={'Tổng số lượng hàng đã bán'} content={totalProduct}/>
            </div>
            <div className={"chart-1"}>
                <Bar options={options1} data={data}/>
            </div>
            <div className={"chart-2"}>
                <Bar options={options2} data={data2}/>
            </div>
        </div>
    </ProductStyle>
}
