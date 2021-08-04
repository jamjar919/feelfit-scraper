import React, {useMemo} from "react";
import {useMemberCount} from "../member-count-provider/MemberCountProvider";
import {Line} from "react-chartjs-2";
import 'chartjs-adapter-moment';

const MemberCountGraph: React.FC = () => {
    const data = useMemberCount()
        .map(({ timestamp, count }) => ({
            x: new Date(timestamp),
            y: count
        }));

    const options = {
        scales: {
            x: {
                type: 'time',
                distribution: 'linear',
                title: 'Time'
            },
            y: {
                title: 'Members in gym'
            }
        }
    };

    const graph = useMemo(() => {
        console.log(data);

        if (data.length < 1) {
            return null;
        }

        const dataSets = {
            datasets: [{
                label: 'Member Count over time',
                data,
            }]
        };

        return <Line
            data={dataSets}
            options={options}
        />;
    }, [data])

    return (graph)
}

export { MemberCountGraph };
