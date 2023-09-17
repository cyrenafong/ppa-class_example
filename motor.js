'use strict'

const Obniz = require('obniz');
const obniz = new Obniz('0455-7709');

obniz.onconnect = async () => {
    const servo = obniz.wired('ServoMotor', {signal:11});
    
    var count = 0;
    const main = async () => {
        servo.angle(0);
        await obniz.wait(1000);
        servo.angle(180);
        await obniz.wait(1000);
    }

    setInterval(main, 1000);
}