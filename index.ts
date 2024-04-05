import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {execSync} from "child_process"
import morgan from "morgan"

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"))

app.post("/webhook", (req: Request, res: Response) => {
    if (req.headers['user-agent'] !== 'Docker-Hub-Sec') {
        return res.sendStatus(401);
    }
    const a = execSync("cd /root/luyen-thi-ptit-golang && git pull && docker compose down web && docker pull n0xgg04/luyenthiptit:latest && docker compose up web -d",{
    })
    console.log(a.toString())
    res.sendStatus(200)
})

app.listen(3344).listen(() => {
    console.log("Listening...")
})
