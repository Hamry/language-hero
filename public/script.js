function startRecording() {
    console.log('Recording started');
    // Placeholder for recording start functionality
}

function stopRecording() {
    console.log('Recording stopped');
    // Placeholder for recording stop functionality
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        startRecording();
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        stopRecording();
    }
});
