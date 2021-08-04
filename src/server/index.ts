import express from "express";
import dotenv from "dotenv";
import {startScraping} from "./scrape";

dotenv.config();

const app = express();
const port = process.env.PORT || 80;
const interval = Number(process.env.SCRAPE_INTERVAL) || 30_0000; // 5 mins
const bearer = process.env.BEARER || "";

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/client"));

app.listen(port, () => {
    console.log(`Active on port ${port}!`);

    console.log('Starting to attempt scraping...');
    startScraping(interval, bearer);
});