/*// axiosライブラリを呼び出す
const axios = require('axios');

const main = async () => {
  try {
    const res = await axios.get('https://api.punkapi.com/v2/beers?page=2&per_page=80');
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}

main(); //main関数を実行*/
/*
// axiosライブラリを呼び出す
const axios = require('axios');

// 実際にデータを取得する getRequest 関数
async function getRequest() {
  let response;
  try {
    response = await axios.get('https://api.lyrics.ovh/v1/Coldplay/Adventure%20of%20a%20Lifetime');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// getRequest を呼び出してデータを読み込む
getRequest();
*/

// axiosライブラリを呼び出す
const axios = require('axios');

// 実際にデータを取得する getRequest 関数
async function getRequest() {
  let response;
  try {
    response = await axios.get('https://api.jikan.moe/v4/top/anime?&limit=5');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// getRequest を呼び出してデータを読み込む
getRequest();