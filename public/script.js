// Close sidebar when clicking the close button
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
function scrollToBottom(elementSelector) {
  const element = document.querySelector(elementSelector);
  element.scrollTop = element.scrollHeight;
}

// Example usage
scrollToBottom("message-history");

function startRecording() {
  console.log("Recording started");
  // Placeholder for recording start functionality
}

function stopRecording() {
  console.log("Recording stopped");
  // Placeholder for recording stop functionality
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    startRecording();
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    stopRecording();
  }
});
