import {connectionPool} from "./db";
import {PredictedCountResponse} from "../../common/ApiResponse";

const QUERY = "SELECT timestamp, count FROM `feelfit` WHERE WEEKDAY(DATE(timestamp)) = WEEKDAY(NOW()) ORDER BY `timestamp` DESC"

type Bin = {
    minute: number;
    counts: number[];
};

const getMinutesSinceStartOfDay = (timestamp: Date) => timestamp.getUTCHours() * 60 + timestamp.getUTCMinutes();

const binResultsPerMinute = (
    results: { timestamp: string; count: number; }[],
    minIncrement: number
): Bin[] => {
    const parsedResults: {
        timestamp: Date,
        count: number
    }[] = results
        .map(({ count, timestamp }) => ({ count, timestamp: new Date(timestamp) }))
        .sort((a, b) =>
            getMinutesSinceStartOfDay(a.timestamp) < getMinutesSinceStartOfDay(b.timestamp) ? -1 : 1
        );

    let currentMin = 0;
    let currentBin: Bin = {
        minute: currentMin,
        counts: []
    };

    const buckets: Bin[] = []
    parsedResults
        .forEach(({ count, timestamp }) => {
            let minutesSinceStartOfDay = getMinutesSinceStartOfDay(timestamp);

            while (
                (currentMin + minIncrement < minutesSinceStartOfDay)
            ) {
                buckets.push(currentBin);

                currentMin += minIncrement;
                currentBin = {
                    minute: currentMin,
                    counts: []
                };
            }

            currentBin.counts.push(count);
        })

    buckets.push(currentBin);

    return buckets;
}

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

const getPredictedCountForDayFromDatabase = (handleResults: (results: PredictedCountResponse) => void) => {

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
