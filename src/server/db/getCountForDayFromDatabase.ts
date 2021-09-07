import {connectionPool} from "./db";
import {DailyMemberCountResponse} from "../../common/ApiResponse";
import {binResultsPerMinute} from "../util/binResultsPerMinute";

const QUERY = "SELECT timestamp, count FROM `feelfit` WHERE DATE(timestamp) = DATE(NOW()) ORDER BY `timestamp` DESC"

const getCountForDayFromDatabase = (handleResults: (results: DailyMemberCountResponse) => void) => {

    connectionPool.query(QUERY, (error, results: { timestamp: string; count: number; }[]) => {
        if (error) throw error;

        const binnedResults = binResultsPerMinute(results, 15);

        const resultsWithCount = binnedResults
            .map(({minute, counts}) => {
                const hour = Math.floor(minute / 60);

                return {
                    hour,
                    minute: minute - hour * 60,
                    count: (counts.reduce((a, b) => (a + b), 0) / counts.length) || 0
                };
            })

        handleResults(resultsWithCount);
    })
}
export { getCountForDayFromDatabase };