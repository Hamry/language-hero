const SpeechSDK = require("microsoft-cognitiveservices-speech-sdk");
let recog;
function stop() {
  recog.stopContinuousRecognitionAsync();
  return;
}

function transcribeFromMicrophone(subscriptionKey, serviceRegion, language) {
  console.log("language:", language);
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    subscriptionKey,
    serviceRegion
  );
  var languageCode;
  switch (language) {
    case "english":
      languageCode = "en-US";
      break;
    case "french":
      languageCode = "fr-FR";
      break;
    case "german":
      languageCode = "de-DE";
      break;
    case "italian":
      languageCode = "it-IT";
      break;
    case "portuguese":
      languageCode = "pt-PT";
      break;
    case "russian":
      languageCode = "ru-RU";
      break;
    case "spanish":
      languageCode = "es-ES";
      break;
    case "turkish":
      languageCode = "tr-TR";
      break;
    default:
      languageCode = "en-US";
      break;
  }
  console.log("languageCode:", languageCode);
  speechConfig.speechRecognitionLanguage = languageCode;
  // const pronunciationAssessmentConfig = new SpeechSDK.PronunciationAssessmentConfig(
  // 	referenceText = "",
  //  	gradingSystem = SpeechSDK.PronunciationAssessmentGradingSystem.HundredMark,
  //  	granularity = SpeechSDK.PronunciationAssessmentGranularity.Word,

  // );

  // Assuming EnableProsodyAssessment exists and is correctly named in the SDK you're using
  //    pronunciationAssessmentConfig.EnableProsodyAssessment(true);

  //  console.log(pronunciationAssessmentConfig);
  console.log(speechConfig);
  //    pronunciationAssessmentConfig.applyTo(speechConfig);
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
  recog = recognizer;
  const container = document.getElementById("message-history");
  const messageElement = document.createElement("div");
  messageElement.classList.add("user-message");
  let currentString = "";
  //create inner html
  let inner = `<img class="user-icon" src="images/Blank-user-icon.jpg" />
    <div class="message-content">
      <p>
        
      </p>
    </div>`;
  messageElement.innerHTML = inner;
  container.appendChild(messageElement);
  //pronunciationAssessmentConfig.applyTo(recognizer);
  console.log("Pronunciation assessment config applied");
  recognizer.recognizing = (s, e) => {
    inner =
      `<img class="user-icon" src="images/Blank-user-icon.jpg" />
    <div class="message-content">
      <p>
        ` +
      currentString +
      e.result.text +
      `
      </p>
    </div>`;
    messageElement.innerHTML = inner;
    console.log(e.privResult);
    console.log(`RECOGNIZING: Text=${e.result.text}`);
    console.log("aaa");
  };

  recognizer.recognized = (s, e) => {
    if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
      //	    let pronunciationAssessmentResult = SpeechSDK.PronunciationAssessmentResult.fromResult(e.result);
      console.log(`RECOGNIZED: Text=${e.result.text}`);
      currentString += e.result.text;
      console.log("Pronunciation: ");
      //	    console.log(pronunciationAssessmentResult);
    } else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
      console.log("NOMATCH: Speech could not be recognized.");
    }
    console.log(`RECOGNIZED: `);
  };
  console.log("Starting continuous recognition");
  recognizer.startContinuousRecognitionAsync(
    () => {
      console.log("Recognition started");
      return recognizer.stopContinuousRecognitionAsync;
      //	var pronunciationAssessmentResultJson = speechRecognitionResult.properties.getProperty(SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult);
    },
    (err) => {
      console.error(`ERROR: ${err}`);
      console.error(`ERROR: ${err}`);
    }
  );

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

module.exports = { transcribeFromMicrophone, stop };
