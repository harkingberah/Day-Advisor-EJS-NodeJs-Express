import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const app = express();
const port = 3000;
const __dirname=dirname(fileURLToPath(import.meta.url))
app.use(express.urlencoded({extended: true}))
app.set("view engine","ejs")
let actualDay = ""
let actualDayQuote=""
function quoteOfTheDay(req, res, next) {
    // const d = new Date("October 28, 2023 01:15:00");
    const d = new Date();
    let day = d.getDay();
    const quotes = ["Moneyday", "TruthDay", "WeddingDay", "ThoughtFulDay", "FriedRice", "Saturation", "SunnyDay"];
    actualDay = quotes[day]
    if (day===6) {
        actualDayQuote = "have fun!";
    }
    else {
        actualDayQuote="work hard!"
    }
    next()
}
app.use(quoteOfTheDay)

app.get("/quote", (req, res) => {
    res.render("index", {
        dDay: actualDay,
        dailyQuote:actualDayQuote
   }) 
});

app.listen(port, () => {
    console.log(`currently listening from port ${port}`);
});