import React, {useMemo} from "react";
import {useMemberCount} from "../member-count-provider/MemberCountProvider";
import {Line} from "react-chartjs-2";
import 'chartjs-adapter-moment';
import {Weekday} from "../../../common/ApiResponse";

const MemberCountGraph: React.FC = () => {
    const memberCount = useMemberCount();

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
                return ({
                    label: Weekday[Number(weekday)],
                    data: entries
                })
            })

        console.log(datasets);

        const data = { datasets };

        return <Line
            data={data}
            options={options}
        />;
    }, [memberCount])

    return (graph)
}

export { MemberCountGraph };
