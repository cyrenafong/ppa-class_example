'use strict';

const Obniz = require('obniz'); //この行を追加
const obniz = new Obniz(process.env.OBNIZ_ID); //この行を追加

const axios = require('axios');
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const translate = require('google-translate-api-x');

const config = {
    channelSecret: 'eb78b5aa92567833710b1b9e334b3e49',
    channelAccessToken: 'RFo3cAFumtTL1w4emJp4IXZO0yrBt13MHw/NomggxCSMAUJd9XCjj5+4GJD5VYXUrsLOHU1rlgyigWLLmB1VP/a86Cxc4doglgL7cYMlAwwoTAs7pOtZ9OTzugP2yY9/0EOYDY3dSJrVQ52XILiVmAdB04t89/1O/w1cDnyilFU='
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
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  
  /*
  let replyText = '';
  replyText = '翻訳完了まで、ちょって待ってね';
  await client.replyMessage(event.replyToken, 
    [{
      type: 'text',
      text: replyText
    },
    {
      type: "sticker",
      packageId: "6136",
      stickerId: "10551380"
    }]);

  let res;
  try{
    res = await translate(event.message.text, {from: 'ja', to: 'en'});
  } catch (error) {
    console.error(error);
  }
  const pushText = res.text;
  console.log(pushText);

  return client.pushMessage(event.source.userId, 
    [
      {
        type: 'text',
        text: pushText
      },
      {
        type: 'template',
        altText: "Rating",
        template: {
          type: "confirm",
          text: "評価して",
          actions: [
            {
              type: "message",
              label: "いいね",
              text: "いいね"
            },
            {
              type: "message",
              label: "よくない",
              text: "よくない"
            }
          ]
        }
      }]);
    */

  /*if (event.message.text !== '天気'){
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '"天気"を入力してね'
    });
  }*/

  /*let replyText = '';
  replyText = 'ちょって待ってね';
  await client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyText
  });*/

  /*//fake message (test if statement)
  if (event.message.text === "今日の天気は？"){
    replyText = "晴れです"
  } else if (event.message.text === "明日の天気は？"){
    replyText = "雨です"
  }*/
  /* //real data of weather
  const CITY_ID = '130010';//東京
  const URL = `https://weather.tsukumijima.net/api/forecast?city=${CITY_ID}`;
  const res = await axios.get(URL);
  const pushText = res.data.description.text;

  //push message
  return client.pushMessage(event.source.userId, {
    type: 'text',
    text: pushText,
  });*/

  /*return client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyText
    //text: event.message.text //実際に返信の言葉を入れる箇所
  });*/

  obniz.display.clear(); //この行を追加
  obniz.display.print(`${event.message.text} \n`); //この行を追加

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text+"!" //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);