import {connectionPool} from "./db";
import {DailyMemberCountResponse} from "../../common/ApiResponse";
import {getMinutesSinceStartOfDay} from "../util/getMinutesSinceStartOfDay";

const QUERY = "SELECT timestamp, count FROM `feelfit` WHERE DATE(timestamp) = DATE(NOW()) ORDER BY `timestamp` DESC"

const getCountForDayFromDatabase = (handleResults: (results: DailyMemberCountResponse) => void) => {

    connectionPool.query(QUERY, (error, results: { timestamp: string; count: number; }[]) => {
        if (error) throw error;

        handleResults(
            results
                .map(({ timestamp, count }) => ({ count, timestamp: new Date(timestamp) }))
                .sort((a, b) =>
                    getMinutesSinceStartOfDay(a.timestamp) < getMinutesSinceStartOfDay(b.timestamp) ? -1 : 1
                )
                .map(({timestamp, count}) => {
                    let minutesSinceStartOfDay = getMinutesSinceStartOfDay(timestamp);

                    const hour = Math.floor(minutesSinceStartOfDay / 60);

                    return {
                        hour,
                        minute: minutesSinceStartOfDay - hour * 60,
                        count
                    };
                })
        );
    })
}
export { getCountForDayFromDatabase };