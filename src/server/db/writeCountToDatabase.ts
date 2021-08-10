import {connectionPool} from "./db";
import {WhoIsInCount} from "../feelfit/whoIsInCount";

const QUERY = "INSERT INTO `feelfit` (`id`, `timestamp`, `clubId`, `count`) VALUES (NULL, current_timestamp(), ?, ?);"

const writeCountToDatabase = ({ count, clubId }: WhoIsInCount) => {
    const values = [
        clubId, count
    ];

    connectionPool.query(QUERY, values, (error, results) => {
        if (error) throw error;

        if (results.affectedRows == 1) {
            console.info('Wrote successfully to database')
        } else {
            console.error(`Something went wrong and didn't write any rows: ${JSON.stringify(results)}`)
        }
    });
};

export { writeCountToDatabase };
