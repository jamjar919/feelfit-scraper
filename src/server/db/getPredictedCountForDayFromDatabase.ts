import {connectionPool} from "./db";
import {MemberCountResponse} from "../../common/ApiResponse";

const QUERY = "SELECT timestamp, count as date FROM `feelfit` ORDER BY `timestamp` DESC"

const getPredictedCountForDayFromDatabase = (handleResults: (results: MemberCountResponse) => void) => {

    connectionPool.query(QUERY, (error, results) => {
        if (error) throw error;

        handleResults(results);
    });
};

export { getPredictedCountForDayFromDatabase };
