import fetch from "node-fetch";
import {getHeaders} from "./headers";

// https://developer.perfectgym.com/api/clubs/whoisin/
const WHO_IS_IN_COUNT_URL = 'https://goapi2.perfectgym.com/v1/Clubs/WhoIsInCount';

type WhoIsInCount = {
    count: number;
    clubId: number;
}
type WhoIsInCountResponse = WhoIsInCount[];

const whoIsInCount = (bearer: string): Promise<WhoIsInCountResponse> => {
    return fetch(WHO_IS_IN_COUNT_URL, {
        headers: getHeaders(bearer)
    })
        .then((res) => {
            if (res.status !== 200) {
                throw Error(`Bad response code: ${res.status}`)
            }

            return res;
        })
        .then(res => res.json())
        .then((response: any) => {
            return response.data as WhoIsInCountResponse;
        });
}

export { whoIsInCount, WhoIsInCountResponse, WhoIsInCount };
