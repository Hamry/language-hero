require('dotenv').config(); // Load environment variables from .env file
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const tts = require('./tts.js');
const gpt = require('./openai.js');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use port from environment variables or default to 3000

// Serve static content from the 'public' directory
app.use(express.static('public'));
app.use(express.json());

// Optional: Define a route for the home page
app.get('/', (req, res) => {
    // Send an HTML file as response - assuming there's an index.html in the 'public' folder
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/test', (req, res) => {
    // Send an HTML file as response - assuming there's an index.html in the 'public' folder                                                                                                                          
    res.sendFile(__dirname + '/public/test.html');
});

const azureSpeechKey = process.env.AZURE_SPEECH_KEY;
const azureSpeechRegion = process.env.AZURE_SPEECH_REGION;

/**
 * Route for transcription
 * Use the Azure Speech Services Speech SDK to transcribe the audio blob from request body
 * and assess pronunciation using Pronunciation assessment in streaming mode
 */
app.post('/transcribe', (req, res) => {
    console.log(req.body);
    const audioConfig = sdk.SpeechConfig.fromSubscription(azureSpeechKey, azureSpeechRegion);
    
});

app.post('/chat/new-chat', async (req, res) => {
    console.log(req.body);
    const chat = await gpt.initializeChat(req.body.level, req.body.language);
    const chatId = chat.thread.id;
    const languageHeroId = chat.assistant.id;
    res.status(200).json({chatId: chatId, languageHeroId: languageHeroId});
});
/**
 * Use the openai assistants API to generate a text response to the synthesized
 * user audio by calling functions from openai.js.
 */
app.post('/chat/send-gpt-message', async (req, res) => {
    console.log(req.body);
    const chat = await gpt.retrieveChat(req.body.chatId, req.body.languageHeroId);
    const response = await chat.sendMessage(req.body.message);
    const run = await chat.createGptRun();
    res.status(200).json({run: run});
});

app.post('/chat/poll-gpt-response', async (req, res) => {
    const chat = await gpt.retrieveChat(req.body.chatId);
    const run = await chat.pollRun(req.body.run);
    console.log("pgr");
    console.log(run);
    const status = run.status;
    if (status == 'completed') {
	const messages = await chat.getNewMessages();
	res.status(200).json({status: 'completed', messages: messages});
    } else if (status === 'failed') {
	console.log(status);
	console.log(chat.run);
	res.status(500).json({status: 'failed', error: chat.run.error});
    } else {
	res.status(201).json({status: 'running'});
    }
    
});

/**
 * Route for speech synthesis using Eleven Labs API.
 */
app.get('/generate-tts', async (req, res) => {
    var ttsStream;
    const text = decodeURIComponent(req.query.text);
    if (req.query.speed !== undefined) {	
	ttsStream = await tts.streamTts(text, req.query.language, req.query.speed);
    } else {
	console.log("AAA");
	ttsStream = await tts.streamTts(text, req.query.language);
//	console.log(ttsStream);
    }
    
    ttsStream.pipe(res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

