//const SpeechSDK = require('microsoft-cognitiveservices-speech-sdk');

let displayElement;

// async function sttFromMic() {
//     console.log("chodemax");
//     const tokenObj = await getTokenOrRefresh(); // Implement this function based on your token acquisition method
//     const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
//     speechConfig.speechRecognitionLanguage = 'en-US';
//     speechConfig.endpointId = "colin";
    
//     const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
//     const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    
//     displayElement.textContent = 'Speak into your microphone...';
    
//     recognizer.recognizeOnceAsync(result => {
//         let displayText;
//         if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
//             displayText = `RECOGNIZED: Text=${result.text}`;
//         } else {
//             displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
//         }
	
//         displayElement.textContent = displayText;
//     });
// }

// Example implementation of getTokenOrRefresh (adjust according to your token management strategy)
// async function getTokenOrRefresh() {
//     return {
//         authToken: 'd32daf8e912d4dd4bf7eeab5b15585d4',
//         region: 'eastus'
//     };
// }



document.addEventListener('DOMContentLoaded', () => {
    //displayElement = document.getElementById('displayText');
    //const startButton = document.getElementById('startButton');
    //startButton.addEventListener('click', sttFromMic);
    initializeAudioPlayer();


    

});

const button = document.getElementById('button');
button.onclick = streamTTSAudio("play ball", "lalals");
