'use strict'

const Obniz = require('obniz');
const obniz = new Obniz('0455-7709');

obniz.onconnect = async () => {
   const led = obniz.wired("LED", {anode:0, cathode:1});
  // LEDをつける
  //お
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(1500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(2000);

  //め
  led.on();
  await obniz.wait(1500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(1500);
  led.off();
  await obniz.wait(2000);

  //で
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(1500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(1500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(1500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(2000);

  //と
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(1500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(2000);

  //う
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(500);
  led.off();
  await obniz.wait(500);
  led.on();
  await obniz.wait(1500);
  led.off();
  await obniz.wait(2000);
}