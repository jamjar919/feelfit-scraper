import {connectionPool} from "./db";
import {WeeklyMemberCountResponse} from "../../common/ApiResponse";

const QUERY = "SELECT timestamp, count, WEEKDAY(DATE(timestamp)) as weekday FROM `feelfit` WHERE DATE(timestamp) > DATE_SUB(DATE(NOW()), INTERVAL ? DAY) ORDER BY `timestamp` DESC"

const getRecentMemberCount = (days: number, handleResults: (results: WeeklyMemberCountResponse) => void) => {
    connectionPool.query(QUERY, [days], (error, results: { timestamp: string; count: number; weekday: number; }[]) => {
        if (error) throw error;

        handleResults(
            results
                .map(({ timestamp, count, weekday }) => ({
                    timestamp: new Date(timestamp).toISOString(),
                    count,
                    weekday
                }))
        );
    });
};

export { getRecentMemberCount };
