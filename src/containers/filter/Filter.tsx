import {Button, InputNumber, Segmented, Select} from "antd";
import {EFilterOption, filterOptions} from "@/containers/app/enums/app.enum";
import React, {useState} from "react";
import {ISelect} from "@/common/interfaces/select.interface";
import {FilterStyle} from "@/containers/filter/filter.style";
import {ESort, SortOptions} from "@/common/enums/sort.enum";
import axios from "axios";
import html2canvas from 'html2canvas';

export interface FilterProps {
    maxRecord: number,
    record: number,
    setRecord: React.Dispatch<React.SetStateAction<number>>,
    setFilterOption?: React.Dispatch<React.SetStateAction<any>>,
    hasFilterOption: boolean,
    hasSelectOption: boolean,
    selectOption: any,
    selectOptions: ISelect<any>[],
    handleSelect: (value: any) => void,
    sortSelect: ESort,
    handleSort: (value: ESort) => void,
    chart?: any,
}

export const FilterComponent = ({
                                    maxRecord,
                                    record,
                                    setRecord,
                                    setFilterOption,
                                    hasFilterOption,
                                    handleSelect,
                                    selectOptions,
                                    selectOption,
                                    handleSort,
                                    sortSelect,
                                    hasSelectOption,
                                    chart
                                }: FilterProps) => {

    const exportChart = async (chart: any) => {
        const canvas = await html2canvas(chart);
        const imgData = canvas.toDataURL('image/jpg');

        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'chart.jpg';
        link.click();
    };

    return <FilterStyle className={'d-flex justify-content-between align-items-end'}>
        <div className={'d-flex'}>
            <div className={'filter-record component'}>
                <p>Tổng số bản ghi</p>
                <InputNumber min={1} max={maxRecord} defaultValue={record} onChange={(value) => {
                    setRecord(value as number)
                }}/>
            </div>
            {hasFilterOption && < div className={'filter-option component'}>
                <p>Tìm theo</p>
                <Segmented<string>
                    options={filterOptions}
                    onChange={(value) => {
                        if (setFilterOption)
                            setFilterOption(value)
                    }}
                />
            </div>
            }
            {hasSelectOption && <div className={'filter-option component'}>
                <p>Sắp xếp theo</p>
                <Select
                    value={selectOption}
                    style={{minWidth: 120}}
                    onChange={handleSelect}
                    options={selectOptions}
                />
                <Select
                    value={sortSelect}
                    style={{minWidth: 120, marginLeft: 10}}
                    onChange={handleSort}
                    options={SortOptions.map(data => ({
                        value: data,
                        label: data
                    }))}
                />
            </div>}
        </div>
        <Button type="primary" className={'btn-export d-flex justify-content-center align-items-center'}
                onClick={async () => {
                    // console.log('hello')
                    // await exportChart(chart);
                    const response = await axios.get('http://localhost:4000/api/dashboard/export-report', {
                        responseType: 'blob'
                    });
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Template.docx');  // Tên file tải về
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }}>Export to PDF
        </Button>
    </FilterStyle>
}
