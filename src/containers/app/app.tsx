"use client";
import React, {useEffect, useState} from 'react';
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Segmented} from "antd";
import {PageStyle} from "@/containers/app/page.style";
import {EStatisticalOption} from "@/containers/app/enums/app.enum";
import {ProductChart} from "@/containers/product/Product";
import {RatingChart} from "@/containers/rating/Rating";
import {OrderChart} from "@/containers/order/Order";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement
);


const statisticalOptions: EStatisticalOption[] = [EStatisticalOption.PRODUCT, EStatisticalOption.RATING, EStatisticalOption.ORDER];


export default function App() {
    const [statisticalOption, setStatisticalOption] = useState<EStatisticalOption>(EStatisticalOption.PRODUCT);

    const [isLoading, setIsloading] = useState(false);
    useEffect(() => {
        setIsloading(false)
    }, [statisticalOption]);


    if (isLoading) return <div>Loading...</div>

    return <PageStyle className={"d-flex flex-column"}>
        <div className={'heading d-flex flex-row justify-content-between'}>
            <p className={'title-app'}>
                Tổng quan
            </p>
            <Segmented<string>
                defaultValue={EStatisticalOption.PRODUCT}
                options={statisticalOptions}
                onChange={(value) => {
                    setStatisticalOption(value as EStatisticalOption)
                }}
            />
        </div>
        <div className={'main-content d-flex flex-row'}>
            <div className={'left-component'}>
                {statisticalOption === EStatisticalOption.PRODUCT && <ProductChart/>}
                {statisticalOption === EStatisticalOption.RATING && <RatingChart/>}
                {statisticalOption === EStatisticalOption.ORDER && <OrderChart/>}
            </div>
        </div>
    </PageStyle>
}
