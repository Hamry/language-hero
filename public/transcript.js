const SpeechSDK = require('microsoft-cognitiveservices-speech-sdk');

function transcribeFromMicrophone(subscriptionKey, serviceRegion) {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (s, e) => {
	console.log(`RECOGNIZING: Text=${e.result.text}`);
	    
    };

    recognizer.recognized = (s, e) => {
	if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
	    console.log(`RECOGNIZED: Text=${e.result.text}`);
	            
	} else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
	    console.log("NOMATCH: Speech could not be recognized.");
	            
	}
	    
    };

    recognizer.startContinuousRecognitionAsync(() => {
	console.log('Recognition started');
	    
    },
					       err => {
						   console.error(`ERROR: ${err}`);
						   console.error(`ERROR: ${err}`);
						   
					       });

    // Stop the recognition after some time (e.g., 30 seconds)
    // setTimeout(() => {
    // 	recognizer.stopContinuousRecognitionAsync(
    // 	    () => {
    // 		console.log('Recognition stopped');
		            
    // 	    },
    // 	    err => {
    // 		console.error(`ERROR: ${err}`);
		            
    // 	    }
    // 	);
	    
    // }, 30000);
    
}

module.exports = transcribeFromMicrophone;
