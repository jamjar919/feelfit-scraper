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
        hour: number,
        minute: number,
        count: number
    }[] = results
        .map(({ timestamp, count }) => ({
            count,
            hour: Number(timestamp.slice(11, 13)),
            minute: Number(timestamp.slice(14, 16))
        }))
        .sort((a, b) =>
            getMinutesSinceStartOfDay(a.hour, a.minute) < getMinutesSinceStartOfDay(b.hour, b.minute) ? -1 : 1
        );

    let currentMin = 0;
    let currentBin: Bin = {
        minute: currentMin,
        counts: []
    };

    const buckets: Bin[] = []
    parsedResults
        .forEach(({ count, hour, minute }) => {
            let minutesSinceStartOfDay = getMinutesSinceStartOfDay(hour, minute);

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
