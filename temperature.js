'use strict'

const Obniz = require('obniz');
const obniz = new Obniz('0455-7709');

obniz.onconnect = async () => {
    const tempsens = obniz.wired('LM60', { gnd: 0, output: 1, vcc: 2 });
    tempsens.onchange = function (temp) {
        console.log(temp);
        obniz.display.clear();
        obniz.display.print(temp);
    };
    //await obniz.wait(1000);
}