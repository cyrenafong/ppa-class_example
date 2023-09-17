const key='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'
const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: key, // defaults to process.env["OPENAI_API_KEY"]
});
  
async function main() {

  const response = await openai.images.generate({
    prompt: "a cat in halloween costume",
    n: 1,
    size: "1024x1024",
  });

  console.log(response.data[0].url); // URLが発行されます。

}

main();