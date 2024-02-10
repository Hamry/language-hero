async function startRecording() {
    console.log('Recording started');
    await streamTTSAudio("play ball", "ll");
    console.log("bugs");
    // Placeholder for recording start functionality
}

function stopRecording() {
    console.log('Recording stopped');
    // Placeholder for recording stop functionality
}

document.addEventListener('keydown', async function(event) {
    if (event.code === 'Space') {
        await startRecording();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        stopRecording();
    }
});
