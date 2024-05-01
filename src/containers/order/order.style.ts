import styled from "styled-components";

export const OrderStyle = styled('div')`
    width: 60vw;

    .left-component {
        min-width: 100%;

        .chart-1 {
            width: 70%;
            margin-top: 10px;
            background-color: white;
            border-radius: 10px;
            padding: 8px;


        }

        .right-component {
            width: 30%;

            .card-order {
                margin-left: 10px;
                margin-right: 0;

                //width: 30;
            }
        }

        .chart-2 {
            margin-top: 10px;
            background-color: white;
            border-radius: 10px;
            padding: 8px;

            .pie-chart-1 {
                width: 50%;
            }

            .pie-chart-2 {
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
