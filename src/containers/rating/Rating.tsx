import averageRatingMock from '@/mock/average_rating.json'
import ratingByDateMock from '@/mock/rating_by_date.json'
import userCommentMock from '@/mock/user_comment.json'
import reviewFullMock from '@/mock/review_full.json'
import React, {useEffect, useState} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar, Line} from 'react-chartjs-2';
import {FilterComponent} from "@/containers/filter/Filter";
import {EFilterOption, ERatingField, ratingOptions} from "@/containers/app/enums/app.enum";
import {ESort} from "@/common/enums/sort.enum";
import {RatingStyle} from "@/containers/rating/rating.style";
import {transformDataInteract} from "@/containers/app/utils/transform-data.utils";
import {IReviews} from "@/containers/app/interfaces/app.interface";
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
            text: 'Thống kê điểm đánh giá trung bình của Top 10 món hàng',
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

            text: 'Thống kê lượt đánh giá trong một ngày',
        },
    },
};

export const options3 = {
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
            text: 'Thống kê tổng lượt đánh giá của người dùng',
        },
    },
};

const mockLabels = averageRatingMock.map((data) => data.name);
const mockData1 = {
    labels: [] as any,
    datasets: [
        {
            label: 'Điểm đánh giá trung bình',
            data: [] as any,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Số lượng đánh giá',
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
            label: 'Số lượt đánh giá trong 1 ngày',
            data: [] as any,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};
const mockData3 = {
    labels: [] as any,
    datasets: [
        {
            label: 'Số lượng đánh giá từng người dùng',
            data: [] as any,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const selectOptions = ratingOptions.map((data) => ({
    value: data,
    label: data,
}))

interface ITop10Review {
    id: number,
    commentCount: number
    avgRating: number
}

interface IAverageRatings {
    name: string
    totalRating: number
    count: number
    id: number
    averageRating: number
    price: number
}

interface IViewPer {
    date: string
    count: number
}

interface IDataRating {
    data: {
        top10Review: ITop10Review[],
        averageRatings: IAverageRatings[],
        viewPerDay: IViewPer[],
    }
    meta: {
        orderBy: string,
        order: string,
        size: string,
        filterBy: string,
    }
}

export const RatingChart = () => {
    const [data, setData] = useState(mockData1);
    const [data2, setData2] = useState(mockData2);
    const [data3, setData3] = useState(mockData3);
    const [filterOption, setFilterOption] = useState<EFilterOption>(EFilterOption.DEFAULT)
    const [record, setRecord] = useState(averageRatingMock.length);
    const [maxRecord, setMaxRecord] = useState(averageRatingMock.length);
    const [selectOption, setSelectOption] = useState<ERatingField>(ERatingField.NAME);
    const [sortOption, setSortOption] = useState<ESort>(ESort.ASC);

    const {data: allData, isLoading} = useQuery({
        queryKey: ['rating'], queryFn: async () => {
            const {data} = await axios.get<IDataRating>('http://localhost:4000/api/dashboard/rating-summary', {
                params: {
                    size: record,
                    order: sortOption,
                    orderBy: selectOption,
                    filterBy: filterOption,
                }
            })
            return data
        },
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        if (!allData) return;
        setData({
            labels: allData.data.averageRatings.map((data) => data.name),
            datasets: [
                {
                    label: 'Điểm đánh giá trung bình',
                    data: allData.data.averageRatings.map((data) => data.averageRating),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Số lượng đánh giá',
                    data: allData.data.averageRatings.map((data) => data.count),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        })
        setData2({
            labels: allData.data.viewPerDay.map((data) => data.date),
            datasets: [
                {
                    label: 'Số lượt đánh giá trong 1 ngày',
                    data: allData.data.viewPerDay.map((data) => data.count),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        })
        setData3({
            labels: allData.data.top10Review.map((data) => data.id),
            datasets: [
                {
                    label: 'Số lượng đánh giá từng người dùng',
                    data: allData.data.top10Review.map((data) => data.commentCount),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        })
    }, [allData, record, filterOption, selectOption, sortOption]);

    const handleSelect = (value: any) => {
        setSelectOption(value)
    }

    const handleSort = (value: any) => {
        setSortOption(value)
    }

    return <RatingStyle>
        <div className={'left-component'}>
            <FilterComponent
                maxRecord={maxRecord}
                record={record}
                setRecord={setRecord}
                hasFilterOption={true}
                selectOption={selectOption}
                selectOptions={selectOptions}
                handleSelect={handleSelect}
                handleSort={handleSort}
                sortSelect={sortOption}
                setFilterOption={setFilterOption}
                hasSelectOption={true}
            />
            {!allData && (<div className={'loading d-flex justify-content-center align-items-center'}>Loading</div>)}

            {allData && (<div className={"chart-1"}>
                <Bar options={options1} data={data}/>
            </div>)}

            {allData && (
                <div className={"chart-2 d-flex flex-row"}>
                    <div className={'chart-line'}>
                        <Line options={options2} data={data2}/>
                    </div>
                    <div className={'chart-bar'}>
                        <Bar options={options3} data={data3}/>;
                    </div>
                </div>
            )}


        </div>
    </RatingStyle>
}
