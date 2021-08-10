import {connectionPool} from "./db";
import {MemberCountResponse} from "../../common/ApiResponse";

const QUERY = "SELECT * FROM `feelfit` ORDER BY `timestamp` DESC"

const getCountFromDatabase = (handleResults: (results: MemberCountResponse) => void) => {
    connectionPool.query(QUERY, (error, results) => {
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
