import {Request, Response} from "express";
import {MemberCountResponse} from "../../common/ApiResponse";
import {getCountFromDatabase} from "../db/getCountFromDatabase";

/**
 * Return the logs via an endpoint to be consumed by the FE
 */
const getMemberCountOverTime =  (_req: Request, res: Response) => {
    getCountFromDatabase((data: MemberCountResponse) => {
        res.send(data)
    });
}

export { getMemberCountOverTime };
