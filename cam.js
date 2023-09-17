'use strict';

const axios = require('axios');
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

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
  /*if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }*/
  const url = 'https://maker.ifttt.com/trigger/receipt/with/key/bxcKVjes7SRX-AQzHjBUUJ';

  if (event.type !== 'message' || event.message.type !== 'image') {
    var imgurl = 'https://api.line.me/v2/bot/message/' + event.message.id + '/content';
    fetch(imgurl, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  await client.replyMessage(event.replyToken, {
      type: 'text',
      text: "Wait"
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);


var replyURL = "https://api.line.me/v2/bot/message/reply";

//LINEに投稿があったら実行
function doPost(event) {

  //投稿を取得 返信用TOKEN,メッセージタイプ,メッセージIDを抽出
  var json = JSON.parse(event.postData.contents);
  var replyToken = json.events[0].replyToken;
  var type = json.events[0].message.type;
  var messageId = json.events[0].message.id;
  
  //投稿が画像でない時の処理
  if (type !== "image"){
  
    replyBot(replyToken);
    return;
  
  }

  //投稿が画像の時 画像のURLを生成し画像取得
  var imageURL = "https://api-data.line.me/v2/bot/message/" + messageId + "/content";
  var image = getImage(imageURL);
  
  //取得した画像をドライブに保存したい場合使用
  //var folder = DriveApp.getFolderById("ドライブのフォルダID");
  //folder.createFile(image);
  
  //取得した画像を文字に起こす
  var ocrText = getText(image);
  
  //起こした文字をLINEで返信する
  replyText(ocrText,replyToken);
  
}

//投稿が画像でないときのメッセージ
function replyBot(replyToken) {
  
  //メッセージ作成
  var botMessage = "画像を送ってね";
  var payload = JSON.stringify({
      "replyToken": replyToken,
      "messages": [{
        "type": "text",
        "text": botMessage
      }]
  });
  
  //メッセージ送信
  UrlFetchApp.fetch(replyURL, {
      "headers": {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + TOKEN,
      },
      "method": "post",
      "payload": payload
  });
  return;

}

//投稿から画像を取得
function getImage(imageURL) {

  //取得と同時にBlobしておく
  var image = UrlFetchApp.fetch(imageURL, {
       "headers": {
         "Content-Type": "application/json; charset=UTF-8",
         "Authorization": "Bearer " + TOKEN,
       },
       "method": "get"
  }).getBlob();
  
  return image;
  
}

//画像を文字に起こす
function getText(image) {
  
  //画像のタイトルとタイプを取得
  var title = image.getName();
  var mimeType = image.getContentType();
  
  //ドキュメントを作成し画像を挿入（DriveAPIの設定が必要）
  var resource = {title: title, mimeType: mimeType};
  var fileId = Drive.Files.insert(resource, image, {ocr: true}).id;
  
  //ドキュメントからテキストを取得したらドキュメントを削除
  var document = DocumentApp.openById(fileId);
  var ocrText = document.getBody().getText().replace("\n", "");
  Drive.Files.remove(fileId);
  
  return ocrText;

}

//起こした文字をLINEで返信
function replyText(ocrText,replyToken) {
  
  //メッセージ作成
  var payload = JSON.stringify({
      "replyToken": replyToken,
      "messages": [{
        "type": "text",
        "text": ocrText
      }]
  });
  
  //メッセージ送信
  UrlFetchApp.fetch(replyURL, {
      "headers": {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + TOKEN,
      },
      "method": "post",
      "payload": payload
  });
  return;

}