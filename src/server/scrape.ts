import { promises as fs } from "fs";
import { createObjectCsvWriter } from 'csv-writer';
import {whoIsInCount, WhoIsInCountResponse} from "./feelfit/whoIsInCount";
import {FEELFIT_CLUB_ID} from "./feelfit/constants";

const LOG_FILE = __dirname + '/log/whoisin.csv'

const csvWriter = createObjectCsvWriter({
    path: LOG_FILE,
    header: [
        {id: 'timestamp', title: 'Timestamp'},
        {id: 'clubId', title: 'Club ID'},
        {id: 'count', title: 'Count'}
    ],
    append: true
});

const writeLogEntry = (data: WhoIsInCountResponse): Promise<void> => {
    const records = data
        .filter((row) => row.clubId === FEELFIT_CLUB_ID)
        .map(row => ({
            timestamp: new Date().getTime(),
            ...row,
        }));

    return csvWriter.writeRecords(records);
}

const doScrape = (bearer: string) => {
    whoIsInCount(bearer)
        .then((data) => writeLogEntry(data))
        .then(() => console.log(`[${new Date().toTimeString()}] Successfully scraped`))
        .catch((err) => {
            console.error(err);
        })
};

const startScraping = (interval: number, bearer: string) => {
    fs.readFile(LOG_FILE)
        .catch((e) => {
            if (e.code === 'ENOENT') {
                fs.mkdir(__dirname + '/log')
                    .then(() => fs.writeFile(LOG_FILE, ""))
                    .then(() => console.log('Created log file as it did not exist'))
                    .catch((e) => console.error('Error writing file', e));
            }
            throw e;
        });

    doScrape(bearer);
    setInterval(() => doScrape(bearer), interval);
};

export { startScraping, LOG_FILE };
