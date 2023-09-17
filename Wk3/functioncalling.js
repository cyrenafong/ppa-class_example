const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: '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',
});

const prompt = {
    role: 'user',
    content: process.env.USERTEXT, //ターミナルから実行時に命令を入力して受ける
};

//盛岡の天気を取得する関数
/*const getMoriokaWeather = async () => {
	return '晴れです。';
}*/

const getWeather = async (city) => {
    console.log(city);
    let cityId = '';
    //都市名とIDの対応はここを参照 https://weather.tsukumijima.net/primary_area.xml 
    if(city === '盛岡') cityId = '030010';     //ここを連携する処理を書けば自動判定できそう

    const url = `https://weather.tsukumijima.net/api/forecast/city/${cityId}`;
    try {
        const response = await fetch(url); 
        const data = await response.json();
        // console.log(data.description.bodyText);
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error.message);
    }
}

const functions = {
    getWeather,
};

//実行
const main = async () => {
    const gptOptions = {
        model: "gpt-4", //"gpt-3.5-turbo",
        messages: [prompt],
        function_call: "auto",
        functions: [
            {
                name: "getWeather",
                description: "天気を取得",
                parameters: {
                    type: "object",
                    properties: {
                        city: {
                            type: "string",
                            description: "天気を調べる地名, e.g. 盛岡, 花巻, 平泉"
                        },
                    }
                },
            },
        ],
    }
    
    const completion = await openai.chat.completions.create(gptOptions);
    
    const message = completion.choices[0].message;
    console.log(completion.choices[0]);
    let responseMessage = '';

    //Function Callなのかそうではないのか
    if(completion.choices[0].finish_reason === "function_call"){
        console.log("function_callします...");
        
        const functionCall = message?.function_call;
        const args = JSON.parse(functionCall.arguments || "{}"); //引数の取得
        // console.log(args)
        const functionRes = await functions[functionCall.name](args?.city); //関数の実行
        // console.log(functionRes); //実行結果
        responseMessage = functionRes.description.bodyText

    }else{
        //Function Callではない場合
        responseMessage = message?.content;
        console.log(`通常GPT返信`);
    }

    console.log(responseMessage);
}


main(); //実行