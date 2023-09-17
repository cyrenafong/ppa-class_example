'use strict'

const Obniz = require('obniz');
const obniz = new Obniz('0455-7709');

obniz.onconnect = async () => {
    const tempsens = obniz.wired('LM60', { gnd: 0, output: 1, vcc: 2 });
    const speaker = obniz.wired('Speaker', {signal:4, gnd:5});
    const led = obniz.wired("LED", {anode:7, cathode:8});
    tempsens.onchange = function (temp) {
        console.log(temp);
        if (temp > 29){
            speaker.play(500);
            led.on();
        } else {
            speaker.stop();
            led.off();
        }
    };
    //var temp = await tempsens.getWait();
    //console.log(temp);
}