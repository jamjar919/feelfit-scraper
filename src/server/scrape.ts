import {whoIsInCount, WhoIsInCountResponse} from "./feelfit/whoIsInCount";
import {FEELFIT_CLUB_ID} from "./feelfit/constants";
import {writeCountToDatabase} from "./db/writeCountToDatabase";

const doScrape = (bearer: string) => {
    whoIsInCount(bearer)
        .then((data: WhoIsInCountResponse) => data
            .filter(row => row.clubId === FEELFIT_CLUB_ID)[0]
        )
        .then((data) => writeCountToDatabase(data))
        .then(() => console.log(`[${new Date().toTimeString()}] Successfully scraped`))
        .catch((err) => {
            console.error(err);
        })
};

const startScraping = (interval: number, bearer: string) => {
    // doScrape(bearer);
    setInterval(() => doScrape(bearer), interval);
};

export { startScraping };
