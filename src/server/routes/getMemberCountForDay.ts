import {Request, Response} from "express";
import {DailyMemberCountResponse} from "../../common/ApiResponse";
import {getCountForDayFromDatabase} from "../db/getCountForDayFromDatabase";

const getMemberCountForDay =  (_req: Request, res: Response) => {
    getCountForDayFromDatabase((data: DailyMemberCountResponse) => {
        res.send(data)
    });
}

export { getMemberCountForDay };
