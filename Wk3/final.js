'use strict';

const Obniz = require('obniz'); //この行を追加
const obniz = new Obniz('0455-7709'); //この行を追加

// obnizがオンラインであることが確認されたら、以下の関数内が自動で実行されます
obniz.onconnect = async function () {
  // LEDの設定
  var sensor = obniz.wired("AM2320", { vcc: 3, sda: 2, gnd: 1, scl: 0 });
  var button = obniz.wired("Button",  {signal:5, gnd:6});

  
}
