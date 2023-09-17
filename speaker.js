'use strict'

const Obniz = require('obniz');
const obniz = new Obniz('0455-7709');

//added
const sleep = (msec) => new Promise(res => setTimeout(res, msec));

// 音階
const Key = {
    "Do" : 523.251,
    "Re" : 587.330,
    "Mi" : 659.255,
    "Fa" : 698.456,
    "So" : 783.991//,
    //"ラ" : 440.000,
    //"シ" : 493.883,
    //"ド2" : 523.251,
    //"レ2" : 587.330
}
//added end

obniz.onconnect = async function () {

  // スピーカーを呼び出す
  const speaker = obniz.wired('Speaker', {signal:4, gnd:5});

  // ディスプレイ処理
  obniz.display.clear();  // 一旦クリアする
  obniz.display.print('Hello obniz!');  // Hello obniz!という文字を出す

  speaker.play(Key["Do"]);
  await obniz.wait(500);
  speaker.stop();

  speaker.play(Key["Do"]);
  await obniz.wait(500);
  speaker.stop();

  speaker.play(Key["Re"]);
  await obniz.wait(500);
  speaker.stop();

  speaker.play(Key["Re"]);
  await obniz.wait(500);
  speaker.stop();

  speaker.play(Key["Mi"]);
  await obniz.wait(500);
  speaker.stop();

  speaker.play(Key["Mi"]);
  await obniz.wait(500);
  speaker.stop();

  speaker.play(Key["Fa"]);
  await obniz.wait(500);
  speaker.stop();

  /*// スイッチの反応を常時監視
  obniz.switch.onchange = function(state) {
    if (state === 'push') {
      // 押されたとき
      console.log('pushed');
      // ディスプレイ処理
      obniz.display.clear();  // 一旦クリアする
      obniz.display.print('pushed');  // pushed という文字を出す
      // 1000hz で音を鳴らす
      // 音階とhzの参考サイト https://tomari.org/main/java/oto.html
      speaker.play(1000); // 1000hz
    } else if (state === 'none') {
      // none で押してないとき
      obniz.display.clear();  // 一旦クリアする
      // スピーカーで音を鳴らさない stop
      speaker.stop();
    }
  }
//obniz.wait(1000) -> 1sec*/
}