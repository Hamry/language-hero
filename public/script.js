const audio = require("./audio.js");
const queryGpt = require("./queryGpt.js");
const transcription = require("./transcript.js"); // Close sidebar when clicking the close button
const parseAnnotations = require("./parseAnnotations.js");
let language = "english";
let proficiency = 1;
let stopTranscript;

function showText(number) {
  // Find the elements by their IDs using the provided number
  var message = document.getElementById("message" + number);
  var wavepng = document.getElementById("wavepng" + number);

  // Check if the message is currently hidden
  if (message.classList.contains("hidden")) {
    // If it is hidden, remove the 'hidden' class to show it
    message.classList.remove("hidden");
    // Hide the wavepng by adding 'hidden' class or setting display to 'none'
    wavepng.style.display = "none";
  } else {
    // Optional: Hide the message again and show the wavepng if needed
    // This part can be omitted if toggling back is not required
    message.classList.add("hidden");
    wavepng.style.display = "block";
  }
}

const playTtsButton = document.getElementById("playTts");
console.log(playTtsButton);
const replayTtsButton = document.getElementById("replayTts");
console.log(replayTtsButton);

playTtsButton.addEventListener("click", function () {
  audio.fetchAndPlayTTS();
});

replayTtsButton.addEventListener("click", function () {
  audio.replayTTS();
});

function createAudioBitVisualization(containerId, numBits, maxHeight) {
  var container = document.getElementById(containerId);
  // Ensure the container has a position style set to relative in your CSS
  for (var i = 0; i < numBits; i++) {
    var bitWidth = 5; // Set a fixed width for each audio bit, for example, 5 pixels
    var height = Math.random() * maxHeight;
    var posX = Math.random() * (container.offsetWidth - bitWidth) + 20; // Adjust posX so bits don't overflow
    var bit = document.createElement("div");
    bit.className = "audioBit";
    bit.style.position = "absolute"; // Bits must be absolutely positioned within the container
    bit.style.height = height + "px";
    bit.style.width = bitWidth + "px"; // Set the width for each bit
    bit.style.left = posX + "px";
    bit.style.bottom = "20px"; // Position from the bottom of the container
    container.appendChild(bit);
  }
}

//language dropdown in sidebar alters language
document
  .getElementById("languageSelect")
  .addEventListener("change", function () {
    language = this.value;
    let languageCode;
    switch (language) {
      case "english":
        languageCode = "en";
        break;
      case "french":
        languageCode = "fr";
        break;
      case "german":
        languageCode = "de";
        break;
      case "italian":
        languageCode = "it";
        break;
      case "portuguese":
        languageCode = "pt";
        break;
      case "russian":
        languageCode = "ru";
        break;
      case "spanish":
        languageCode = "es";
        break;
      case "turkish":
        languageCode = "tr";
        break;
      default:
        languageCode = "en";
        break;
    }
    var paragraphs = document.querySelectorAll("p");
    for (var i = 0; i < paragraphs.length; i++) {
      // Set the lang attribute to the desired value, e.g., 'en'
      paragraphs[i].setAttribute("lang", "languageCode");
    }
    console.log(`Language set to: ${language}`); // For demonstration
    clearChat();
  });

//proficiency buttons alter proficiency
document.querySelectorAll(".proficiency-btn").forEach((button) => {
  button.addEventListener("click", function () {
    proficiency = parseInt(this.textContent) || proficiency; // Update proficiency or keep the old value if parsing fails
    console.log(`Proficiency set to: ${proficiency}`); // For demonstration
    clearChat();
  });
});

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

function clearChat() {
  const messageHistory = document.getElementById("message-history");

  while (messageHistory.firstChild) {
    messageHistory.removeChild(messageHistory.lastChild);
  }
}

// Example usage
scrollToBottom();

async function startRecording() {
  console.log("Recording started");
  handleGptResponse(
    'Claro, aquí tienes una oración en español: "El sol brilla intensamente en el cielo azul, iluminando el paisaje montañoso."',
    language
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
    console.log("Space");
    //handleUserTranscript("Example User Text");
    //startRecording();
    await startRecording();
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    stopRecording();
  }
});

document.getElementById("testGpt").addEventListener("click", async () => {
  const messageHistory = document.getElementById("message-history");
  const messages = await queryGpt(
    "¡Hola, Señor Language Hero! ¿Cómo estoy hoy? Es un placer conocerle. Es una muy bueno dia. Vi un hombre fea.",
    proficiency,
    language,
    messageHistory.childNodes.length == 0
  );
  console.log(messages);
  console.log(messages[0]);
  console.log(messages[0].content);
  console.log(messages[0].content[0]);
  console.log(messages[0].content[0].text);
  console.log(messages[0].content[0].text.value);
  const message = messages[0].content[0].text.value;
  console.log(message);
  console.log(parseAnnotations(message));
  // console.log(parseAnnotations(`¡Hola, Señor Language Hero! ¿Cómo <1 V Está is the correct conjugation for addressing a person formally.>estoy<1> hoy? Es un placer conocerle. Es una <2 S In Spanish, the adjective comes after the noun.>muy bueno<2> día. Vi un <3 L "fea" should be replaced with "feo", as "hombre" is a masculine noun.>hombre fea<3>.`));
});

async function transcribeHandler(e) {
  console.log("Event Target:", e.target);
  console.log("Current Target:", e.currentTarget);
  e.stopPropagation();
  if (e.target.classList.contains("active")) {
      console.log("Trying to call a stop");
      stopTranscript();
      //stopTranscript();
      e.target.classList.toggle("active");
  } else {
    e.target.removeEventListener("click", transcribeHandler);
    e.target.classList.add("active");
    const creds = {
      authToken: "d32daf8e912d4dd4bf7eeab5b15585d4",
      region: "eastus",
    };
      stopTranscript = async () => {

	  transcription.transcribeFromMicrophone(
	      creds.authToken,
	      creds.region,
	      "spanish"
	  );
	  const lastMessage = document.getElementById("last-message");
	  const lastMessageText = lastMessage.textContent;
	  console.log(lastMessageText);
	  const messageHistory = document.getElementById("message-history");
	  await queryGpt(lastMessageText, proficiency, language, messageHistory.childNodes.length == 1).then(
	      (messages) => {
		  console.log(messages);
		  return handleGptResponse(messages[0].content[0].text.value, language);
	      })
	  lastMessage.id = "message" + Date.now();
      };
      e.target.addEventListener("click", transcribeHandler);
      console.log();
  }
}

document
  .getElementById("record-btn")
  .addEventListener("click", transcribeHandler);

async function handleGptResponse(text, language = "en") {
  const container = document.getElementById("message-history");

  //const loadingElement = document.getElementById("loading");
  const messageAudioPlayer = document.createElement("audio");
  messageAudioPlayer.controls = true;

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

      const delim = "\n";
      const response = text.slice(text.indexOf(delim) + delim.length);
      const annotated = text.slice(0, text.indexOf(delim));
      const highlighted = parseAnnotations(annotated);
      const lastMessage = document.getElementById("last-message");

      lastMessage.innerHTML = highlighted;
    // Assuming language is a global variable or passed as an argument
    //   audioPlayer.src = `/generate-tts?text=${encodedText}&lang=$(language)`;

    // // Wait for the audio to be loaded
    // await new Promise((resolve, reject) => {
    //   audioPlayer.onloadeddata = () => resolve();
    //   audioPlayer.onerror = (e) => reject(e);
    // });

    // // Play the audio
    //   audioPlayer.play();
            const encodedText = encodeURIComponent(response);
      const audioBlobUrl = await audio.fetchAndPlayTTS(encodedText, language);

    messageAudioPlayer.src = audioBlobUrl;
    // Hide loading element
    //loadingElement.style.display = 'none';

    // Create and append the message element
    let number = document.getElementById("message-history").childElementCount;
    messageAudioPlayer.id = "player" + number;
    console.log(
      `
    <img class="bot-icon" src="images/Blank-user-icon.jpg" />
    <div id= "latest-` +
        number +
        `" class="message-content">
        <button class="message-play-btn" onclick="replay(`+ number + `)">
            <i class="fa fa-play" style=""></i>
        </button>

        <p class="hidden">${text}</p>
    </div>
`
    );
    messageElement.innerHTML =
      `
            <img class="bot-icon" src="images/Blank-user-icon.jpg" />
            <div id= "latest-` +
      number +
      `" class="message-content">
                <button class="message-play-btn" onclick="audioPlayer.play()">
                    <i class="fa fa-play" style=""></i>
                </button>

                <p id="message` +
      number +
      `" class="hidden">${text}</p>
                <img id="wavepng` +
      number +
      `" src="/images/download.png"/>
                <button id="text-btn-` +
      number +
      `" class="translate-btn" >T</button>
            </div>
        `;

    document
      .getElementById("text-btn-" + number)
      .addEventListener("click", () => {
        showText(number);
      });
    //createAudioBitVisualization("latest-" + number, 20, 10);
    scrollToBottom();
  } catch (error) {
    console.error("Error handling GPT response:", error);
    // Hide loading element in case of error
    loadingElement.style.display = "none";
    alert("Failed to load audio. Please try again.");
  }
}

function replay(playerNumber) {
  player = document.getElementById("player" + playerNumber);
  player.play();
}

