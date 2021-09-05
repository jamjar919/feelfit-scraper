import {Request, Response} from "express";
import {getPredictedCountForDayFromDatabase} from "../db/getPredictedCountForDayFromDatabase";

const getPredictedCountForLastDay = (_req: Request, res: Response) => {
    getPredictedCountForDayFromDatabase((results) => {
        res.send(results);
    })
}

export { getPredictedCountForLastDay };
