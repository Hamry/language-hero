// const { Writable } = require("stream");
// function initializeAudioPlayer() {
//   const audioPlayer = document.createElement("audio");
//   audioPlayer.id = "audioPlayer";
//   audioPlayer.controls = true;
//   //audioPlayer.autoplay = true;
// }

// async function streamTTSAudio(text, language) {
//   const audioPlayer = document.getElementById("audioPlayer");
//   console.log(audioPlayer);
//   const encodedText = encodeURIComponent(text);

//   audioPlayer.src = "/generate-tts?text=" + encodedText + "&lang=" + language;
//   audioPlayer.play();
// }




let audioBlobUrl = null; // To store the blob URL

// Function to fetch and play TTS audio, and store it for replay
async function fetchAndPlayTTS(text, language) {
    const ttsAudio = document.getElementById('ttsAudio');
    text = encodeURIComponent(text);
    language = encodeURIComponent(language);
    const response = await fetch('/generate-tts?text=' + text + '&lang=' + language);
    const audioBlob = await response.blob();
    audioBlobUrl = URL.createObjectURL(audioBlob); // Create a URL for the blob

    // Play the audio
    ttsAudio.src = audioBlobUrl;
    ttsAudio.play();
    
    return audioBlobUrl;
    // Show replay button after first play
//    replayTtsButton.style.display = 'block';
}

// Function to replay the stored TTS audio
function replayTTS() {
    if (audioBlobUrl) {
	const ttsAudio = document.getElementById('ttsAudio');
        ttsAudio.src = audioBlobUrl; // Use the stored URL
        ttsAudio.play();
    }
}


module.exports = { fetchAndPlayTTS, replayTTS };

