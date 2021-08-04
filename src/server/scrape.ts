import fetch from "node-fetch";

// https://developer.perfectgym.com/api/clubs/whoisin/
// const COMPANY_ID = 140;
// const WHO_IS_IN_COUNT_URL = 'https://goapi2.perfectgym.com/v1/Clubs/WhoIsInCount';

const CLUB_ID = 522; // or 523 for MMA I think
const WHO_IS_IN_URL = `https://goapi2.perfectgym.com/Api/Clubs/WhoIsIn?clubId=${CLUB_ID}`;

// Who knows what these do, but they are probably important
const DEVICE_NAME = "James";
const APP_BUILD_NUMBER = "785";
const WHITE_LABEL_ID = "55012E5C-D8B9-4A0C-977F-0712A7AAB649";
const APP_PLATFORM = "iOS";
const USER_AGENT = "PerfectGym/1.15.1 (com.perfectgymsa.PerfectGymGo.PerfectGymGo2.FeelFitGym; build:785; iOS 14.6.0) Alamofire/4.9.1";
const APP_VERSION = "1.15.1";

const ENCODING_HEADERS = {
    "Accept-Encoding": "gzip;q=1.0, compress;q=0.5",
    "Accept-Language": "en-GB;q=1.0",
    "Content-Type": "application/json; encoding=utf-8",
};

const startScraping = (interval: number, bearer: string) => {
    setInterval(() => doScrape(bearer), interval);
};

const doScrape = (bearer: string) => {
    fetch(WHO_IS_IN_URL, {
        headers: {
            "Host": "goapi2.perfectgym.com",
            "Accept": "*/*",
            "Authorization": `Bearer ${bearer}`,
            "X-Go-Device-Name": DEVICE_NAME,
            "X-Go-App-Build-Number": APP_BUILD_NUMBER,
            "X-Go-White-Label-ID": WHITE_LABEL_ID,
            "X-Go-App-Platform": APP_PLATFORM,
            "User-Agent": USER_AGENT,
            "X-Go-App-Version": APP_VERSION,
            ...ENCODING_HEADERS
        }
    })
    .then((res) => {
        console.log(res);
        return res;
    })
    .then(res => res.json())
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.error(err);
    })
};

export { startScraping };
