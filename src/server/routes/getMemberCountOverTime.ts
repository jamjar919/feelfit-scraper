import {Request, Response} from "express";
import {MemberCountResponse} from "../../common/ApiResponse";
import {getCountFromDatabase} from "../db/getCountFromDatabase";

/**
 * Return the logs via an endpoint to be consumed by the FE
 */
const getMemberCountOverTime =  (req: Request, res: Response) => {
    const date: Date = new Date(Date.parse(req.query["date"] as string));

    getCountFromDatabase(date, (data: MemberCountResponse) => {
        res.send(data)
    });
}

export { getMemberCountOverTime };
