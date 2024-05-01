import styled from "styled-components";

export const RatingStyle = styled('div')`
    width: 60vw;

    .left-component {
        min-width: 100%;

        .chart-1 {
            margin-top: 10px;
            background-color: white;
            border-radius: 10px;
            padding: 8px;
        }

        .chart-2 {
            width: 100%;
            margin-top: 10px;
            background-color: white;
            border-radius: 10px;
            padding: 8px;

            .chart-line {
                width: 50%;
            }

            .chart-bar {
                width: 50%;
            }
        }

        .filter {
            background-color: white;
            border-radius: 10px;
            padding: 8px;

            .component {
                padding-right: 1em;
            }

            .filter-record {

            }
        }
    }
`;
