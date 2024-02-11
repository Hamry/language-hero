require("dotenv").config();

const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs({
  apiKey: process.env.EL_API_KEY,
  voiceId: process.env.EL_VOICE_ID,
});

async function streamTts(text, speed = 1) {
  console.log(text);
  const voiceResponse = await voice.textToSpeechStream({
    textInput: text,

    speed: speed,
      output_format: "mp3_44100_192",
      voice: process.env.EL_VOICE_ID,
    //	stability:       0.5,
    //	similarityBoost: 0.5,
    modelId: "eleven_multilingual_v2",
    //	style:           1,
    responseType: "stream",
    speakerBoost: true,
  });
  console.log("done");
  console.log(voiceResponse);
  return voiceResponse;
}

module.exports = { streamTts };
