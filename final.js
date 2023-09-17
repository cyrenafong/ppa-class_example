'use strict';

const axios = require('axios');
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const Obniz = require('obniz'); //この行を追加
const obniz = new Obniz('0455-7709'); //この行を追加

const config = {
  channelSecret: 'd3b2677220107fc0763879aff6b68774',
  channelAccessToken: 'za1mUpYM4nJI5Jya6nsVpn+GucUtvuZJMkH76p7Y+tEpG0LbaLEfaShwfGJhx4+PdYQYJRAHKR8rjvVW0GZ7bI8+ob+G04dp9MGMbjbPUckA8zA7WW7ZhF69EKY1TT/+z/SVCB4Cl4jYVAawmhwinAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('最近のマイブームはカメラです。')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

    //ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
    if(req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff'){
        res.send('Hello LINE BOT!(POST)');
        console.log('疎通確認用');
        return; 
    }

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
 	    console.error(err);
        res.status(500).end();
      });
});

const client = new line.Client(config);
var myHeaders = new Headers();
myHeaders.append("apikey", "w6TGtEsQfx7x3ZckfzBf2GNFXh3sm6kH");

async function handleEvent(event) {
    const url = "https://maker.ifttt.com/trigger/temp/with/key/bxcKVjes7SRX-AQzHjBUUJ";;
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    let replyText = '';
    if (event.message.text === "測る"){
        replyText = 'ちょって待ってね';
        await client.replyMessage(event.replyToken, {
            type: 'text',
            text: replyText
        });
        const hcsr04 = obniz.wired("HC-SR04", {gnd:0, echo:1, trigger:2, vcc:3});
        var button = obniz.wired("Button",  {signal:5, gnd:6});

        await obniz.wait(2000);
        let avg = 0;
        let count = 0;
        for (let i=0; i<3; i++) { // measure three time. and calculate average
            const val = await hcsr04.measureWait();
            if (val) {
                count++;
                avg += val;
            }
        }
        if (count > 1) {
            avg /= count;
        }
        console.log("The distance is: ", avg); //in mm
        var result = avg/10;
        const re = await axios.post(url, {value1: result});
        console.log(re.data);
        const pushText = "身長（距離）は" + result + "cm";
        console.log(pushText);
        return client.pushMessage(event.source.userId, {
            type: 'text',
            text: pushText,
        });
    }else if (event.message.text === "データ一覧"){
        return client.pushMessage(event.source.userId, {
            type: 'text',
            text: "https://docs.google.com/spreadsheets/d/1KB7Ybtq5bMaVjkUfGqDO9az9wB-yb24mZk3rzlKH_MU/edit?usp=sharing",
        });
    }else{
        return client.replyMessage(event.replyToken, 
            {
                "type": "template",
                "altText": "Selection",
                "template": {
                  "type": "confirm",
                  "text": "選択してください",
                  "actions": [
                    {
                      "type": "message",
                      "label": "測る",
                      "text": "測る"
                    },
                    {
                      "type": "message",
                      "label": "データ一覧",
                      "text": "データ一覧"
                    }
                  ]
                }
              });
    }
  
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);