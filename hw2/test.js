'use strict'

const Obniz = require('obniz'); //この行を追加
const obniz = new Obniz('0455-7709'); //この行を追加

obniz.onconnect = async () => {
    obniz.io9.output(true); //io0を5vに
    obniz.io11.output(false); //io2をGNDに

    //io1をアナログピンに
    obniz.ad10.start((voltage) => {
        console.log(`changed to ${voltage} v`);
    });
}