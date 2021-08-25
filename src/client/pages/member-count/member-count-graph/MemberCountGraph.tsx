import React, {useMemo} from "react";
import {Line} from "react-chartjs-2";
import 'chartjs-adapter-moment';
import {MemberCountResponse, Weekday} from "../../../../common/ApiResponse";
import {getColourForWeekday} from "./getColourForWeekday";

import "./MemberCountGraph.scss";

type MemberCountGraphProps = {
    getData: () => MemberCountResponse
}

const MemberCountGraph: React.FC<MemberCountGraphProps> = (props) => {
    const memberCount = props.getData();

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
        if (memberCount.length < 1) {
            return null;
        }

        const datasetsArray: {[weekday: number]: {x: number, y: number}[]} = {};
        memberCount
            .forEach((row) => {
                if (!(row.weekday in datasetsArray)) {
                    datasetsArray[row.weekday] = []
                }

                datasetsArray[row.weekday].push({
                    x: Date.parse(row.timestamp),
                    y: row.count
                });
            });

        const datasets = Object.entries(datasetsArray)
            .map(([weekday, entries]) => {
                const dayOfWeek: number = Number(weekday);
                const colour: string = getColourForWeekday(dayOfWeek);

                return ({
                    label: Weekday[dayOfWeek],
                    data: entries,
                    backgroundColor: colour,
                    fill: true,
                    pointBackgroundColor: "#000",
                    showLine: true
                })
            })

        console.log(datasets);

        const data = { datasets };

        return <Line
            className="memberCountGraph"
            data={data}
            options={options}
        />;
    }, [memberCount])

    return (graph)
}

export { MemberCountGraph };
