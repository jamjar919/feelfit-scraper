import {Request, Response} from "express";
import {MemberCountResponse} from "../../common/ApiResponse";
import {getCountFromDatabase} from "../db/getCountFromDatabase";

/**
 * Return the logs via an endpoint to be consumed by the FE
 */
const getMemberCountForDay =  (req: Request, res: Response) => {
    try {
        const date: Date = new Date(Date.parse(req.query["date"] as string));

        getCountFromDatabase(date, (data: MemberCountResponse) => {
            res.send(data)
        });
    } catch {
        res.status(500);
        res.send({ error: true, message: "Invalid date" });
    }
}

export { getMemberCountForDay };
