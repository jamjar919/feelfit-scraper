import {Request, Response} from "express";
import { createReadStream } from 'fs';
import CsvReadableStream from 'csv-reader';
import {LOG_FILE} from "../scrape";
import {MemberCountResponse} from "../../common/ApiResponse";

/**
 * Return the logs via an endpoint to be consumed by the FE
 */
const getMemberCountOverTime =  (_req: Request, res: Response) => {
    const data: MemberCountResponse = [];

    let inputStream = createReadStream(LOG_FILE, 'utf8');
    inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true }))
        .on('data', (buffer) => {
            const [timestamp, _id, count] = Array.prototype.slice.call(buffer, 0);
            data.push({
                timestamp, count
            })
        })
        .on('end', () => res.send(data));
}

export { getMemberCountOverTime };
