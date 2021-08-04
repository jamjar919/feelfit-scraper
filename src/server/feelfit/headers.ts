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

const getHeaders = (bearer: string) => ({
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
});

export { getHeaders }