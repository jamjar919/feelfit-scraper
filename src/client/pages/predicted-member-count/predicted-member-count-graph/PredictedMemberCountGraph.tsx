import React, {useMemo} from 'react';
import {PredictedCountResponse} from "../../../../common/ApiResponse";
import {Line} from "react-chartjs-2";

type PredictedMemberCountGraphProps = {
    getData: () => PredictedCountResponse
}

type Datapoint = {
    x: string;
    y: number;
}

const PredictedMemberCountGraph: React.FC<PredictedMemberCountGraphProps> = (props) => {
    const memberCount = props.getData();

    const options = {
        scales: {
            x: {
                distribution: 'linear',
                title: 'Time'
            },
            y: {
                title: 'Members in gym'
            }
        }
    };

    const graph = useMemo(() => {
        const firstQuartile = {
            label: "First Quartile",
            data: [] as Datapoint[],
            fill: '+1',
            backgroundColor: "#e16162"
        };
        const secondQuartile = {
            label: "Median",
            data: [] as Datapoint[],
            pointBackgroundColor: "#000",
            borderColor: '#000',
            backgroundColor: "#000"
        };
        const thirdQuartile = {
            label: "Third Quartile",
            data: [] as Datapoint[],
            fill: '-1',
            backgroundColor: "#078080"
        };

        memberCount.forEach(({
             hour, minute, quartiles
        }) => {
            const x = `${hour}:${minute}`;

            firstQuartile.data.push({ x, y: quartiles[0] });
            secondQuartile.data.push({ x, y: quartiles[1] });
            thirdQuartile.data.push({ x, y: quartiles[2] });
        })

        const datasets = [
            firstQuartile,
            secondQuartile,
            thirdQuartile
        ];

        const data = { datasets };

        return <Line
            data={data}
            options={options}
        />;
    }, [memberCount])


    return (graph);
}

export { PredictedMemberCountGraph };
