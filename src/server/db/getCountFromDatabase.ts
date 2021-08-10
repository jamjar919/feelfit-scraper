import {connectionPool} from "./db";
import {MemberCountResponse} from "../../common/ApiResponse";

const QUERY = "SELECT * FROM `feelfit` WHERE DATE(timestamp) = ? ORDER BY `timestamp` DESC"

const convertDateToMySqlDate = (date: Date) => date
    .toISOString()
    .slice(0, 10);

const getCountFromDatabase = (date: Date, handleResults: (results: MemberCountResponse) => void) => {
    const timestamp = convertDateToMySqlDate(date);

    console.log(timestamp);

    connectionPool.query(QUERY, timestamp, (error, results) => {
        if (error) throw error;

        const filteredResults: MemberCountResponse = results
            .map((row: any) => ({
                timestamp: row.timestamp as string,
                count: row.count as number
            }))

        handleResults(filteredResults);
    });
};

export { getCountFromDatabase };
