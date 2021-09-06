import {connectionPool} from "./db";
import {DailyMemberCountResponse} from "../../common/ApiResponse";
import {getMinutesSinceStartOfDay} from "../util/getMinutesSinceStartOfDay";
import {toGMT} from "../util/toGMT";

const QUERY = "SELECT timestamp, count FROM `feelfit` WHERE DATE(timestamp) = DATE(NOW()) ORDER BY `timestamp` DESC"

const getCountForDayFromDatabase = (handleResults: (results: DailyMemberCountResponse) => void) => {

    connectionPool.query(QUERY, (error, results: { timestamp: string; count: number; }[]) => {
        if (error) throw error;

        handleResults(
            results
                .map(({ timestamp, count }) => ({ count, timestamp: toGMT(timestamp) }))
                .sort((a, b) =>
                    getMinutesSinceStartOfDay(a.timestamp) < getMinutesSinceStartOfDay(b.timestamp) ? -1 : 1
                )
                .map(({timestamp, count}) => {
                    let minutesSinceStartOfDay = getMinutesSinceStartOfDay(timestamp);

                    const hour = Math.floor(minutesSinceStartOfDay / 60);
                    const minute = minutesSinceStartOfDay - hour * 60;
                    
                    return { hour, minute, count };
                })
        );
    })
}
export { getCountForDayFromDatabase };