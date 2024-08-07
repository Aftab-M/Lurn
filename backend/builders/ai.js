const {GoogleGenerativeAI, GenerativeModel} = require("@google/generative-ai")
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function getHelp(req, res){
    
    console.log('IN GETHELP-------------')
    var prompt = "Answer in 40 words, the question : "+req.body.prompt;

    console.log(prompt);

    const model = genAI.getGenerativeModel({model: 'gemini-pro'});
    const result = await model.generateContent(prompt);
    const resp = await result.response;
    res.send(resp.text());
    console.log('Resp generated------------------------------')
    console.log(resp.text());
    
}


module.exports = {getHelp}
