'use strict';

const axios = require('axios');
const Obniz = require('obniz'); //この行を追加

const main = async () => {
    var obniz = new Obniz("0455-7709");
    const url = 'https://maker.ifttt.com/trigger/temp/with/key/bxcKVjes7SRX-AQzHjBUUJ';

    obniz.onconnect = async function() {
    const hcsr04 = obniz.wired("HC-SR04", {gnd:0, echo:1, trigger:2, vcc:3});
    var button = obniz.wired("Button",  {signal:5, gnd:6});

        button.onchange = async function(pressed){
            await obniz.wait(2000);
            let avg = 0;
            let count = 0;
            for (let i=0; i<3; i++) { // measure three time. and calculate average
                const val = await hcsr04.measureWait();
                if (val) {
                    count++;
                    avg += val;
                }
            }
            if (count > 1) {
                avg /= count;
            }
            var dis = avg/10;
            const res = await axios.post(url,{
                value1: dis
            });
            console.log(res.data);
        };
    }

}

main();
