'use strict'

const Obniz = require('obniz'); //この行を追加
const obniz = new Obniz('0455-7709'); //この行を追加

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
  channelSecret: 'eb78b5aa92567833710b1b9e334b3e49',
  channelAccessToken: 'RFo3cAFumtTL1w4emJp4IXZO0yrBt13MHw/NomggxCSMAUJd9XCjj5+4GJD5VYXUrsLOHU1rlgyigWLLmB1VP/a86Cxc4doglgL7cYMlAwwoTAs7pOtZ9OTzugP2yY9/0EOYDY3dSJrVQ52XILiVmAdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
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

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }
    
    const rgbled = obniz.wired('WS2811', {gnd:4, vcc: 5, din: 6});
    if (event.message.text === 'おはよう'){
      rgbled.rgb(0, 255, 0);
      await obniz.wait(500);
      rgbled.rgb(0, 0, 0);
      await obniz.wait(500);
      rgbled.rgb(0, 255, 0);
      await obniz.wait(500);
      rgbled.rgb(0, 0, 0);
      await obniz.wait(500);
      rgbled.rgb(0, 255, 0);      
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: "おはよう〜"
      });
    } else if (event.message.text === '終わり'){
      rgbled.rgb(0, 0, 0);
      await obniz.wait(500);  
      rgbled.rgb(255, 0, 0);
      await obniz.wait(500);
      rgbled.rgb(0, 0, 0);
      await obniz.wait(500);
      rgbled.rgb(255, 0, 0);
      await obniz.wait(500);
      rgbled.rgb(0, 0, 0);
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: "おやすみ〜"
      });
    }
  }

app.listen(PORT);
console.log(`Server running at ${PORT}`);