const alarmButton = document.getElementById("alarmButton");
const alarmState = document.getElementById("alarmState");
const alarmSound = document.getElementById("audio");

let audioInterval; // Variable to hold the interval ID

// Add a click event listener to the button
alarmButton.addEventListener("click", function () {
  // Toggle the text content of the span element between "On" and "Off"
  if (alarmState.textContent === "On") {
    alarmState.textContent = "Off";
    alarmButton.style.backgroundColor = "blue";
    alarmButton.style.color = "white";
    alarmSound.pause();
    alarmSound.currentTime = 0;
  } else {
    alarmButton.style.backgroundColor = "#c2fbd7";
    alarmButton.style.color = "green";
    alarmState.textContent = "On";
  }
});

// Function to update percentage value, text, and color for a specific box
// Function to update percentage value, text, and color for a specific box
function updateBoxValues(boxIndex, value, newText) {
    // Update text
    const textElement = document.querySelectorAll("[data-text]")[boxIndex];
    textElement.setAttribute("data-text", newText);
  
    // Update text inside h2 tag
    const h2Element = document.querySelectorAll(".number h2")[boxIndex];
  
    if (typeof value === "boolean") {
      h2Element.textContent = value ? "Yes" : "No";
  
      // Update percentage value and color for Flame
      const percentElement = document.querySelectorAll(".percent")[boxIndex];
      const circleElement = percentElement.querySelector("circle:nth-child(2)");
      if (value) {
        percentElement.style.setProperty("--num", 100);
        circleElement.style.stroke = "red";
      } else {
        percentElement.style.setProperty("--num", 0);
        circleElement.style.stroke = "#555"; // Default color
      }
  
      // Check if alarm is on, temperature is greater than 70, or flame is true, then play the alarm sound
      if (alarmState.textContent === "On" && (value || (newText === "Temp." && value > 70))) {
        alarmSound.play();
      }
    } else {
      // Update percentage value for Temp
      const percentElement = document.querySelectorAll(".percent")[boxIndex];
      percentElement.style.setProperty("--num", value);
      h2Element.textContent = `${value}%`;
  
      // Change color to red if temperature is greater than 80
      if (newText === "Temp." && value > 80) {
        const circleElement = percentElement.querySelector("circle:nth-child(2)");
        circleElement.style.stroke = "red";
      }
  
      // Check if alarm is on, temperature is greater than 70, or flame is true, then play the alarm sound
      if (alarmState.textContent === "On" && (value > 70 || document.querySelectorAll(".number h2")[1].textContent === "Yes")) {
        alarmSound.play();
      }
    }
  }
  
// Update values for the first box (index 0)
updateBoxValues(0, 40, "Temp.");

// Update values for the second box (index 1)
updateBoxValues(1, false, "Flame");
