require("./transcript.js");// Close sidebar when clicking the close button
document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("sidebar").classList.remove("sidebar-open");
  document.getElementById("overlay").classList.remove("overlay-open");
});

// Example: Toggle light/dark mode (simplified version)
document.getElementById("themeSwitch").addEventListener("change", function (e) {
  if (e.target.checked) {
    document.body.classList.add("dark-mode"); // You need to define .dark-mode in your CSS
  } else {
    document.body.classList.remove("dark-mode");
  }
});

// script.js
document.getElementById("settings-btn").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("sidebar-open");
  document.getElementById("overlay").classList.toggle("overlay-open");
});

// Optional: Close sidebar when clicking on the overlay
document.getElementById("overlay").addEventListener("click", function () {
  document.getElementById("sidebar").classList.remove("sidebar-open");
  this.classList.remove("overlay-open");
});
// Function to keep an element scrolled to the bottom
function scrollToBottom() {
  const element = document.getElementById("message-history");
  element.scrollTop = element.scrollHeight;
}

// Example usage
scrollToBottom();

async function startRecording() {
  console.log("Recording started");
  await streamTTSAudio("play ball", "ll");
  console.log("bugs");
  // Placeholder for recording start functionality
}

function stopRecording() {
  console.log("Recording stopped");
  // Placeholder for recording stop functionality
}

document.addEventListener("keydown", async function (event) {
  if (event.code === "Space") {
    await startRecording();
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    stopRecording();
  }
});

document.getElementById("testGpt").addEventListener("click", async () => {
    const messages = await queryGpt("Hola Senor Language Hero", 1, "Espanol");
    console.log(messages);
});



document.getElementById("testTranscribe").addEventListener("click", async () => {
    const creds = {
	authToken: 'd32daf8e912d4dd4bf7eeab5b15585d4',
	region: 'eastus'
    };
    console.log(transcribeFromMicrophone(creds.authToken, creds.region));
});


