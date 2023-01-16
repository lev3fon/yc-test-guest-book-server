const express = require('express');
const timeout = require('connect-timeout');
// @ts-ignore
const {saveMessage, waitDriver, getAllMessages} = require("./ydb");
// const {Driver, getCredentialsFromEnv, getLogger} = require('ydb-sdk');
// const logger = getLogger({level: 'debug'});
// const endpoint = 'grpcs://ydb.serverless.yandexcloud.net:2135';
// const database = '/ru-central1/b1gdpjl18f3lnmle6cdu/etn5eirg4nu3m00t3872';
// const authService = getCredentialsFromEnv();
// const driver = new Driver({endpoint, database, authService});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(timeout('120s'));

app.get("/hello", (req: { headers: { [x: string]: any; }; }, res: { send: (arg0: string) => any; }) => {
    var ip = req.headers['x-forwarded-for']
    console.log(`Request from ${ip}`);
    return res.send("Hello!");
});

app.post('/api/save-message', async (req: { headers: { [x: string]: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: unknown): void; new(): any; }; }; }) => {
    var ip = req.headers['x-forwarded-for']
    const body = req.body
    console.log('Тело запроса', body)
    try {
        return await saveMessage({ text: body.text || 'Какой-то текст', creatorIp: ip, creatorName: body.creatorName || 'Кто-то создал' })
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/api/get-messages', async (req: any, res: { send: (arg0: any) => void; }) => {
    const result = await getAllMessages()
    res.send(result)
})


waitDriver()

app.listen(process.env.PORT || 3031, () => {
    console.log(`App listening at port ${process.env.PORT || 3031}`);
});
