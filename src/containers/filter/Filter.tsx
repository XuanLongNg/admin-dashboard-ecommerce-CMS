import {InputNumber, Segmented, Select} from "antd";
import {EFilterOption, filterOptions} from "@/containers/app/enums/app.enum";
import React, {useState} from "react";
import {ISelect} from "@/common/interfaces/select.interface";
import {FilterStyle} from "@/containers/filter/filter.style";
import {ESort, SortOptions} from "@/common/enums/sort.enum";

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
                                }: FilterProps) => {

    return <FilterStyle className={'d-flex'}>
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

    </FilterStyle>
}
