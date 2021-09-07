import {toGMT} from "./toGMT";
import {getMinutesSinceStartOfDay} from "./getMinutesSinceStartOfDay";

type Bin = {
    minute: number;
    counts: number[];
};

const binResultsPerMinute = (
    results: { timestamp: string; count: number; }[],
    minIncrement: number
): Bin[] => {
    const parsedResults: {
        timestamp: Date,
        count: number
    }[] = results
        .map(({ count, timestamp }) => ({ count, timestamp: toGMT(timestamp) }))
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

            while (currentMin + minIncrement < minutesSinceStartOfDay) {
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

export { binResultsPerMinute, Bin };
