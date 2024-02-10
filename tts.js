require('dotenv').config();

const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
	apiKey:  process.env.ELEVENLABS_API_KEY, 
	voiceId: process.env.ELEVENLABS_VOICE_ID,
	    
    }
    
);

async function streamTts(text, speed = 1) {
    const voiceResponse = await voice.textToSpeechStream({

	textInput: text,


	speed: speed
	stability:       0.5,            
	similarityBoost: 0.5,            
	modelId:         "eleven_multilingual_v2",       
	style:           1,                              
	responseType:    "stream",                       
	speakerBoost:    true                            
	
    });
}

