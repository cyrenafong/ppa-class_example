'use strict';

const axios = require('axios');
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const key='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'

const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: key, // defaults to process.env["OPENAI_API_KEY"]
});

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
  
  const completion = await openai.chat.completions.create({
	messages: [{ role: 'user', content: 'あなたの名前は?' }],
	model: 'gpt-3.5-turbo',
  });
	
  const t = completion.choices[0].message.content;
  console.log(completion.choices[0].message.content);

  return client.replyMessage(event.replyToken, 
      {
        type: 'text',
        text: t
      });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);