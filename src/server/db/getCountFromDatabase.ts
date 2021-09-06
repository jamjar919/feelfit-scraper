import {connectionPool} from "./db";
import {WeeklyMemberCountResponse} from "../../common/ApiResponse";

const QUERY = "SELECT timestamp, count as date FROM `feelfit` WHERE DATE(timestamp) = ? ORDER BY `timestamp` DESC"

const convertDateToMySqlDate = (date: Date) => date
    .toISOString()
    .slice(0, 10);

const getCountFromDatabase = (date: Date, handleResults: (results: WeeklyMemberCountResponse) => void) => {
    const timestamp = convertDateToMySqlDate(date);

    connectionPool.query(QUERY, timestamp, (error, results) => {
        if (error) throw error;

        handleResults(results);
    });
};

export { getCountFromDatabase };
