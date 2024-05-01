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
    labels: mockLabels,
    datasets: [
        {
            label: 'Điểm đánh giá trung bình',
            data: averageRatingMock.map((data) => data.average_raring),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Số lượng đánh giá',
            data: averageRatingMock.map((data) => data.number_or_review),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const mockData2 = {
    labels: ratingByDateMock.map((data) => data.review_date),
    datasets: [
        {
            label: 'Số lượt đánh giá trong 1 ngày',
            data: ratingByDateMock.map((data) => data.review_count),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};
const mockData3 = {
    labels: userCommentMock.map((data) => data.user_id),
    datasets: [
        {
            label: 'Số lượng đánh giá từng người dùng',
            data: userCommentMock.map((data) => data.comment_count),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const selectOptions = ratingOptions.map((data) => ({
    value: data,
    label: data,
}))

export const RatingChart = () => {
    const [data, setData] = useState(mockData1);
    const [data2, setData2] = useState(mockData2);
    const [data3, setData3] = useState(mockData3);

    const [filterOption, setFilterOption] = useState<EFilterOption>(EFilterOption.DEFAULT)
    const [record, setRecord] = useState(averageRatingMock.length);
    const [maxRecord, setMaxRecord] = useState(averageRatingMock.length);
    const [selectOption, setSelectOption] = useState<ERatingField>(ERatingField.NAME);
    const [sortOption, setSortOption] = useState<ESort>(ESort.ACS);


    useEffect(() => {
        const mock1 = [...averageRatingMock.sort()];
        const mock2 = [...reviewFullMock.sort()];
        const mock3 = [...userCommentMock.sort()];

        const length1 = mock1.length;
        const length2 = mock2.length;
        const length3 = mock3.length;

        setMaxRecord(length1);
        let dataTmp1;
        let dataTmp2;

        switch (selectOption) {
            case ERatingField.NAME:
                dataTmp1 = mock1.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.name.localeCompare(b.name);
                    return b.name.localeCompare(a.name);
                })
                dataTmp2 = mock3.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.user_id - b.user_id;
                    return b.user_id - a.user_id;
                })
                break;
            case ERatingField.PRICE:
                dataTmp1 = mock1.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.price - b.price
                    return b.price - a.price
                })
                dataTmp2 = mock3.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.user_id - b.user_id;
                    return b.user_id - a.user_id;
                })
                break;
            case ERatingField.NOR:
                dataTmp1 = mock1.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.number_or_review - b.number_or_review
                    return b.number_or_review - a.number_or_review
                })
                dataTmp2 = mock3.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.comment_count - b.comment_count;
                    return b.comment_count - a.comment_count;
                })
                break;
            case ERatingField.AVG_RARING:
                dataTmp1 = mock1.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.average_raring - b.average_raring
                    return b.average_raring - a.average_raring
                })
                dataTmp2 = mock3.sort((a, b) => {
                    if (sortOption === ESort.ACS)
                        return a.comment_count - b.comment_count;
                    return b.comment_count - a.comment_count;
                })
                break;
            default:
                dataTmp1 = mock1.sort()
                dataTmp2 = mock3.sort()
                break;
        }

        const dataProcessed1 = dataTmp1.slice(record > length1 ? 0 : length1 - record, length1);
        const dataProcessed2 = transformDataInteract(mock2 as IReviews[], filterOption);
        const dataProcessed3 = dataTmp2.slice(record > length3 ? 0 : length3 - record, length3)

        setData({
            labels: dataProcessed1.map((data) => data.name),
            datasets: [
                {
                    label: 'Điểm đánh giá trung bình',
                    data: dataProcessed1.map((data) => data.average_raring),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Số lượng đánh giá',
                    data: dataProcessed1.map((data) => data.number_or_review),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        })
        setData2({
            labels: dataProcessed2.map((data) => data.created_at),
            datasets: [
                {
                    label: 'Số lượt đánh giá trong 1 ngày',
                    data: dataProcessed2.map((data) => data.total),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        })
        setData3({
            labels: dataProcessed3.map((data) => data.user_id),
            datasets: [
                {
                    label: 'Số lượng đánh giá từng người dùng',
                    data: dataProcessed3.map((data) => data.comment_count),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
            <div className={"chart-1"}>
                <Bar options={options1} data={data}/>
            </div>
            <div className={"chart-2 d-flex flex-row"}>
                <div className={'chart-line'}>
                    <Line options={options2} data={data2}/>
                </div>
                <div className={'chart-bar'}>
                    <Bar options={options3} data={data3}/>;
                </div>
            </div>
        </div>
    </RatingStyle>
}
