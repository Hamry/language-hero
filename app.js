require('dotenv').config(); // Load environment variables from .env file
const sdk = require('microsoft-cognitiveservices-speech-sdk');

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

/**
 * Use the openai assistants API to generate a text response to the synthesized
 * user audio by calling functions from openai.js.
 */
app.post('/generate-openai-response', (req, res) => {});

/**
 * Route for speech synthesis using Eleven Labs API.
 */
app.get('/generate-tts', async (req, res) => {
    if (req.query.speed !== undefined) {
	const ttsStream = await streamTts(req.query.text, req.query.language, req.query.speed);
    } else {
	const ttsStream = await streamTts(req.query.text, req.query.language);
    }
    
    ttsStream.pipe(res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
