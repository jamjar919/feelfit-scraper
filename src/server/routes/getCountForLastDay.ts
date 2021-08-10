import {Request, Response} from "express";
import {MemberCountResponse} from "../../common/ApiResponse";
import {getRecentMemberCount} from "../db/getRecentMemberCount";

const getCountForLastDay =  (_req: Request, res: Response) => {
    try {
        getRecentMemberCount(1, (data: MemberCountResponse) => {
            res.send(data)
        });
    } catch {
        res.status(500);
        res.send({ error: true, message: "uh oh" });
    }

};

export { getCountForLastDay };
