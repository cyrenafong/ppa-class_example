'use strict'

const Obniz = require('obniz');
const obniz = new Obniz('0455-7709');

obniz.onconnect = async function () {
  // RGB LEDを呼び出す
  const rgbled = obniz.wired('WS2811', {gnd:4, vcc: 5, din: 6});

  // ディスプレイ処理
  //obniz.display.clear();  // 一旦クリアする
  //obniz.display.print('Hello obniz!');  // Hello obniz!という文字を出す

  rgbled.rgb(0, 255, 0);
  await obniz.wait(1000);
  rgbled.rgb(0, 0, 0);

  // スイッチの反応を常時監視
    /*if (state === 'push') {
      // 押されたとき
      console.log('pushed');
      // ディスプレイ処理
      obniz.display.clear();  // 一旦クリアする
      obniz.display.print('pushed');  // pushed という文字を出す
      // RGB LED 赤色 R値 255 G値 0 B値 0 なので rgbled.rgb(255, 0, 0);
      // 他のカラーコード参考 http://www.netyasun.com/home/color.html
      // green をみて、R値 0 G値 255 B値 0 の場合、なので rgbled.rgb(0, 255, 0);
      rgbled.rgb(0, 255, 0);
    } else if (state === 'none') {
      // none で押してないとき
      obniz.display.clear();  // 一旦クリアする
      // RGB LED OFF
      // RGB値をどれも点灯しない = 0というやり方
      rgbled.rgb(0, 0, 0);
    }
  }*/
}