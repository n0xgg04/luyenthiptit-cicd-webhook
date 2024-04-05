import express from 'express'
import bodyParser from "body-parser";
import {execSync} from "child_process"
import morgan from "morgan"

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"))

app.post("/webhook", (req, res) => {
    if (req.headers['user-agent'] !== 'Docker-Hub-Sec') {
        return res.sendStatus(401);
    }
    execSync("docker rm -f luyenthiptit-web && docker pull n0xgg04/luyenthiptit:latest && docker-compose up -d")
    res.sendStatus(200)
})

app.listen(3344).listen(() => {
    console.log("listening...")
})
