"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const timeout = require('connect-timeout');
// @ts-ignore
const { saveMessage, waitDriver, getAllMessages } = require("./ydb");
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
app.get("/hello", (req, res) => {
    var ip = req.headers['x-forwarded-for'];
    console.log(`Request from ${ip}`);
    return res.send("Hello!");
});
app.post('/api/save-message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var ip = req.headers['x-forwarded-for'];
    const body = req.body;
    console.log('Тело запроса', body);
    try {
        return yield saveMessage({ text: body.text || 'Какой-то текст', creatorIp: ip, creatorName: body.creatorName || 'Кто-то создал' });
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
app.get('/api/get-messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield getAllMessages();
    res.send(result);
}));
waitDriver();
app.listen(process.env.PORT || 3031, () => {
    console.log(`App listening at port ${process.env.PORT || 3031}`);
});
