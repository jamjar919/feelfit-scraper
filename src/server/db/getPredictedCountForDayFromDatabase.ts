import {connectionPool} from "./db";
import {PredictedCountResponse} from "../../common/ApiResponse";

const QUERY = "SELECT timestamp, count FROM `feelfit` WHERE WEEKDAY(DATE(timestamp)) = WEEKDAY(NOW()) ORDER BY `timestamp` DESC"

type Bucket = {
    minute: number;
    counts: number[];
};

const getMinutesSinceStartOfDay = (timestamp: Date) => timestamp.getUTCHours() * 60 + timestamp.getUTCMinutes();

const getPredictedCountForDayFromDatabase = (handleResults: (results: PredictedCountResponse) => void) => {

    connectionPool.query(QUERY, (error, results: { timestamp: string; count: number; }[]) => {
        if (error) throw error;

        // Bin the results every 15 mins
        const parsedResults: {
            timestamp: Date,
            count: number
        }[] = results
            .map(({ count, timestamp }) => ({ count, timestamp: new Date(timestamp) }))
            .sort((a, b) =>
                getMinutesSinceStartOfDay(a.timestamp) < getMinutesSinceStartOfDay(b.timestamp) ? -1 : 1
            );

        let currentMin = 0;
        let minIncrement = 15;
        const buckets: Bucket[] = []

        let currentBucket: Bucket = {
            minute: currentMin,
            counts: []
        };

        parsedResults
            .forEach(({ count, timestamp }) => {
                let minutesSinceStartOfDay = getMinutesSinceStartOfDay(timestamp);

                console.log("minutesSinceStartOfDay", minutesSinceStartOfDay);

                while (
                    (currentMin < minutesSinceStartOfDay + minIncrement)
                ) {
                    buckets.push(currentBucket);

                    currentMin += minIncrement;
                    currentBucket = {
                        minute: currentMin,
                        counts: []
                    };
                }

                currentBucket.counts.push(count);
            })

        handleResults(buckets as any);
    });
};

export { getPredictedCountForDayFromDatabase };
