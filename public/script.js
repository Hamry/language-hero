const audio = require("./audio.js");
const queryGpt = require("./queryGpt.js");
const transcription = require("./transcript.js");// Close sidebar when clicking the close button

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
  await audio.streamTTSAudio(
    'Claro, aquí tienes una oración en español: "El sol brilla intensamente en el cielo azul, iluminando el paisaje montañoso."',
    "ll"
  );
  console.log("bugs");
  // Placeholder for recording start functionality
}

function stopRecording() {
  console.log("Recording stopped");
  // Placeholder for recording stop functionality
}

function handleUserTranscript(text) {
  const container = document.getElementById("message-history");
  const messageElement = document.createElement("div");
  messageElement.classList.add("user-message");
  //create inner html
  const inner = `<img class="user-icon" src="images/Blank-user-icon.jpg" />
    <div class="message-content">
      <p>
        Quieres 
        <span
          class="tooltip"
          data-explanation="This verb does not need to be conjugated as it is the subject of another verb (quieres)."
          >montas</span
        >
        caballos manana?
      </p>
    </div>`;
  messageElement.innerHTML = inner;
  scrollToBottom();
}

document.addEventListener("keydown", async function (event) {
    if (event.code === "Space") {
	console.log("Space")
    handleUserTranscript("Example User Text");
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
    console.log(transcription.transcribeFromMicrophone(creds.authToken, creds.region, "spanish"));
});


async function handleGptResponse(text, language = "en") {
  const container = document.getElementById("message-history");

  //const loadingElement = document.getElementById("loading");
  const audioPlayer = document.getElementById("audioPlayer");
  const messageElement = document.createElement("div");
  messageElement.classList.add("bot-message");
  messageElement.innerHTML = `
          <img class="bot-icon" src="images/Blank-user-icon.jpg" />
          <div class="message-content">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          </div>
      `;

  container.appendChild(messageElement);
  scrollToBottom();
  // Show loading element
  //loadingElement.style.display = 'block';

  try {
    const encodedText = encodeURIComponent(text);
    // Assuming language is a global variable or passed as an argument
    audioPlayer.src = `/generate-tts?text=${encodedText}&lang=ll`;

    // Wait for the audio to be loaded
    await new Promise((resolve, reject) => {
      audioPlayer.onloadeddata = () => resolve();
      audioPlayer.onerror = (e) => reject(e);
    });

    // Play the audio
    audioPlayer.play();

    // Hide loading element
    //loadingElement.style.display = 'none';

    // Create and append the message element

    messageElement.innerHTML = `
            <img class="bot-icon" src="images/Blank-user-icon.jpg" />
            <div class="message-content">
                <button class="message-play-btn" onclick="audioPlayer.play()">
                    <i class="fa fa-play" style=""></i>
                </button>
                <p>${text}</p>
            </div>
        `;
    scrollToBottom();
  } catch (error) {
    console.error("Error handling GPT response:", error);
    // Hide loading element in case of error
    loadingElement.style.display = "none";
    alert("Failed to load audio. Please try again.");
  }
}
