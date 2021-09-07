import {connectionPool} from "./db";
import {DailyPredictedMemberCountResponse} from "../../common/ApiResponse";
import {binResultsPerMinute} from "../util/binResultsPerMinute";

const QUERY = "SELECT timestamp, count FROM `feelfit` WHERE WEEKDAY(DATE(timestamp)) = WEEKDAY(NOW()) ORDER BY `timestamp` DESC"

const getQuartiles = (counts: number[]) => {
    const size = counts.length;
    const sorted = counts.sort((a, b) => a < b ? -1 : 1);

    return [
        sorted[0],
        sorted[Math.floor(size * 0.25)],
        sorted[Math.floor(size * 0.5)],
        sorted[Math.floor(size * 0.75)],
        sorted[counts.length - 1]
    ].map((quartile: number) => typeof quartile === "undefined" ? 0 : quartile);
};

const getPredictedCountForDayFromDatabase = (handleResults: (results: DailyPredictedMemberCountResponse) => void) => {

    connectionPool.query(QUERY, (error, results: { timestamp: string; count: number; }[]) => {
        if (error) throw error;

        // Bin the results every 15 mins
        const binnedResults = binResultsPerMinute(results, 15);

        // Calculate quartiles and return
        const resultsWithQuartiles = binnedResults
            .map(({minute, counts}) => {
                const hour = Math.floor(minute / 60);

                return {
                    hour,
                    minute: minute - hour * 60,
                    quartiles: getQuartiles(counts)
                };
            });

        handleResults(resultsWithQuartiles);
    });
};

export { getPredictedCountForDayFromDatabase };
