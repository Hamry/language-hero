function initializeAudioPlayer() {
    const audioPlayer = document.createElement('audio');
    audioPlayer.id = 'audioPlayer';
    audioPlayer.controls = true;
//    audioPlayer.autoplay = true;
}

async function streamTTSAudio(text, language) {
    const audioPlayer = document.getElementById('audioPlayer');
    console.log(audioPlayer);
    const encodedText = encodeURIComponent(text);
    audioPlayer.src = '/generate-tts?text=' + encodedText + '&lang=' + language;
    audioPlayer.play();        
}

