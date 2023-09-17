'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: 'd3b2677220107fc0763879aff6b68774',
    channelAccessToken: 'za1mUpYM4nJI5Jya6nsVpn+GucUtvuZJMkH76p7Y+tEpG0LbaLEfaShwfGJhx4+PdYQYJRAHKR8rjvVW0GZ7bI8+ob+G04dp9MGMbjbPUckA8zA7WW7ZhF69EKY1TT/+z/SVCB4Cl4jYVAawmhwinAdB04t89/1O/w1cDnyilFU='
};

const OpenAI = require('openai')
const openai = new OpenAI({
    apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});

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

  let replyText = '';
  replyText = 'ちょって待ってね';
  await client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyText
  });

  const response = await openai.images.generate({
    prompt: event.message.text,
    n: 1,
    size: "1024x1024",
  });

  console.log(response.data[0].url); // URLが発行されます。

  return client.pushMessage(event.source.userId, 
      {
        "type": "image",
        "originalContentUrl": response.data[0].url,
        "previewImageUrl": response.data[0].url
      });
  //
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);