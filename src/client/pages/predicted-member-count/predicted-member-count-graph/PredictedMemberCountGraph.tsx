import React, {useMemo} from 'react';
import {DailyMemberCountResponse, DailyPredictedMemberCountResponse} from "../../../../common/ApiResponse";
import {Line} from "react-chartjs-2";

type PredictedMemberCountGraphProps = {
    getPredicted: () => DailyPredictedMemberCountResponse;
    getCurrent: () => DailyMemberCountResponse;
}

type Datapoint = {
    x: string;
    y: number;
}

const formatLabel = (hour: number, minute: number) => {
    const formattedMinute = minute === 0 ? "00" : minute;

    return `${hour}:${formattedMinute}`
}

const PredictedMemberCountGraph: React.FC<PredictedMemberCountGraphProps> = (props) => {
    const predictedMemberCount = props.getPredicted();
    const currentMemberCount = props.getCurrent();

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
        const current = {
            label: "Current",
            data: [] as Datapoint[],
            showLine: true,
            pointBackgroundColor: "#000",
            borderColor: '#000',
        }
        const min = {
            label: "Minimum",
            data: [] as Datapoint[],
        };
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
        const max = {
            label: "Maximum",
            data: [] as Datapoint[],
        };

        predictedMemberCount.forEach(({
             hour, minute, quartiles
        }) => {
            const x = formatLabel(hour, minute);

            // Only include quartile data if the current member count has not been shown for that time period
            const matching = currentMemberCount.find(
                (value) => (value.hour === hour) && (value.minute === minute)
            );

            if (typeof matching === "undefined") {
                firstQuartile.data.push({x, y: quartiles[1]});
                secondQuartile.data.push({x, y: quartiles[2]});
                thirdQuartile.data.push({x, y: quartiles[3]});
            } else {
                // Else set it to the known count
                firstQuartile.data.push({x, y: matching.count});
                secondQuartile.data.push({x, y: matching.count});
                thirdQuartile.data.push({x, y: matching.count});
            }

            min.data.push({x, y: quartiles[0]});
            max.data.push({x, y: quartiles[4]});
        })

        currentMemberCount.forEach(({
            hour, minute, count
        }) => {
            const x = formatLabel(hour, minute);

            current.data.push({ x, y: count })
        })

        const datasets = [
            current,
            min,
            firstQuartile,
            secondQuartile,
            thirdQuartile,
            max
        ];

        const data = { datasets };

        return <Line
            data={data}
            options={options}
        />;
    }, [predictedMemberCount, currentMemberCount])


    return (graph);
}

export { PredictedMemberCountGraph };
