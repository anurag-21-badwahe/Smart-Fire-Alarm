// const alarmButton = document.getElementById("alarmButton");
// const alarmState = document.getElementById("alarmState");
// const alarmSound = document.getElementById("audio");

// let audioInterval; // Variable to hold the interval ID

// // Add a click event listener to the button
// alarmButton.addEventListener("click", function () {
//   // Toggle the text content of the span element between "On" and "Off"
//   if (alarmState.textContent === "On") {
//     alarmState.textContent = "Off";
//     alarmButton.style.backgroundColor = "blue";
//     alarmButton.style.color = "white";
//     alarmSound.pause();
//     alarmSound.currentTime = 0;
//   } else {
//     alarmButton.style.backgroundColor = "#c2fbd7";
//     alarmButton.style.color = "green";
//     alarmState.textContent = "On";
//   }
// });

// // Function to update percentage value, text, and color for a specific box
// // Function to update percentage value, text, and color for a specific box
// function updateBoxValues(boxIndex, value, newText) {
//   // Update text
//   const textElement = document.querySelectorAll("[data-text]")[boxIndex];
//   textElement.setAttribute("data-text", newText);

//   // Update text inside h2 tag
//   const h2Element = document.querySelectorAll(".number h2")[boxIndex];

//   if (typeof value === "boolean") {
//     h2Element.textContent = value ? "Yes" : "No";

//     // Update percentage value and color for Flame
//     const percentElement = document.querySelectorAll(".percent")[boxIndex];
//     const circleElement = percentElement.querySelector("circle:nth-child(2)");
//     if (value) {
//       percentElement.style.setProperty("--num", 100);
//       circleElement.style.stroke = "red";
//     } else {
//       percentElement.style.setProperty("--num", 0);
//       circleElement.style.stroke = "#555"; // Default color
//     }


//     if (
//       alarmState.textContent === "On" &&
//       (value || (newText === "Temp." && value > 30))
//     ) {
//       alarmSound.play();
//     }
//   } else {
//     // Update percentage value for Temp
//     const percentElement = document.querySelectorAll(".percent")[boxIndex];
//     percentElement.style.setProperty("--num", value);
//     h2Element.textContent = `${value}°`;  

//     // Change color to red if temperature is greater than 80
//     if (newText === "Temp." && value > 30) {
//       const circleElement = percentElement.querySelector("circle:nth-child(2)");
//       circleElement.style.stroke = "red";
//     }

//     // Check if alarm is on, temperature is greater than 70, or flame is true, then play the alarm sound
//     if (
//       alarmState.textContent === "On" &&
//       (value ||
//         document.querySelectorAll(".number h2")[1].textContent === "Yes")
//     ) {
//       alarmSound.play();
//     }
//   }
// }

// const fetchData = async () => {
//   const url =
//     "https://api.thingspeak.com/channels/2498727/feeds.json?api_key=JM75YVJWQS44R8CE&results=2";

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     // Extract field1 and field2 values from the latest entry
//     // Extract the field1 value from the latest entry

//     //Flame Sensor
//     const field1Value = data.feeds[1].field2; // "38"

//     // Temp. sensor
//     const field2Value = data.feeds[0].field1; // "4095"

//     console.log(field1Value);

//     // Update box values with the retrieved data
//     updateBoxValues(0, field2Value, "Temp.");

//     // Check if field2Value indicates flame detection (assuming it's a number)
//     const isFlameDetected = field1Value < 1000; // Assuming field2Value is a number
//     console.log(isFlameDetected);

//     updateBoxValues(1, isFlameDetected, "Flame");
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// // Call fetchData initially to fetch and display data
// fetchData();

// // Set interval to fetch data periodically (every 5 seconds in this example)
// setInterval(fetchData, 3000); // Adjust interval as needed



const alarmButton = document.getElementById("alarmButton");
const alarmState = document.getElementById("alarmState");
const alarmSound = document.getElementById("audio");

let initialFlameDetected = false;
let initialTemperatureExceeded = false;

// Function to stop the alarm sound
function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
}
function playAlarmIfNeeded() {
  if (alarmState.textContent === "On" && (initialFlameDetected || initialTemperatureExceeded)) {
    console.log("Alarm conditions met. Playing Alarm");
    alarmSound.play();
  } else {
    console.log("Alarm conditions not met. Not playing Alarm");
  }
}

// Call playAlarmIfNeeded function when the page loads
playAlarmIfNeeded();

// Add a click event listener to the button
// Add a click event listener to the button
alarmButton.addEventListener("click", function () {
  // Toggle the text content of the span element between "On" and "Off"
  if (alarmState.textContent === "On") {
    alarmState.textContent = "Off";
    alarmButton.style.backgroundColor = "blue";
    alarmButton.style.color = "white";
    stopAlarm(); // Stop the alarm when turning off
  } else {
    alarmButton.style.backgroundColor = "#c2fbd7";
    alarmButton.style.color = "green";
    alarmState.textContent = "On";
    // Check if the alarm conditions are met and play the alarm sound
    playAlarmIfNeeded();
  }
});

// Function to play the alarm sound if needed
// Function to play the alarm sound if needed
// Function to play the alarm sound if needed

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

    // Check if alarm is on, temperature is greater than 30, or flame is true, then play the alarm sound
    if (
      alarmState.textContent === "On" &&
      (value || initialTemperatureExceeded)
    ) {
      playAlarmIfNeeded();
    }
  } else {
    // Update percentage value for Temp
    const percentElement = document.querySelectorAll(".percent")[boxIndex];
    percentElement.style.setProperty("--num", value);
    h2Element.textContent = `${value}°`;

    // Change color to red if temperature is greater than 30
    if (newText === "Temp." && value > 30) {
      const circleElement = percentElement.querySelector("circle:nth-child(2)");
      circleElement.style.stroke = "red";
      initialTemperatureExceeded = true;
    }

    // Check if alarm is on, temperature is greater than 30, or flame is true, then play the alarm sound
    if (
      alarmState.textContent === "On" &&
      (value || initialFlameDetected)
    ) {
      playAlarmIfNeeded();
    }
  }
}

// Function to update flame sensor data
function updateFlameSensor(fieldValue) {
  parseInt(fieldValue);
  const isFlameDetected = fieldValue < 1000; // Assuming fieldValue is a number
  updateBoxValues(1, isFlameDetected, "Flame");
  initialFlameDetected = isFlameDetected;
}

// Function to update temperature sensor data
function updateTempSensor(fieldValue) {
  updateBoxValues(0, fieldValue, "Temp.");
}

// Function to fetch data from the API and update sensors
// Function to fetch data from the API and update sensors
const fetchDataAndUpdateSensors = async () => {
  const urlFlame =
    "https://api.thingspeak.com/channels/2498727/fields/3.json?api_key=JM75YVJWQS44R8CE&results=2";
  const urlTemp =
    "https://api.thingspeak.com/channels/2498727/fields/1.json?api_key=JM75YVJWQS44R8CE&results=2";

  try {
    // Fetch flame sensor data
    const responseFlame = await fetch(urlFlame);
    const dataFlame = await responseFlame.json();
    
    // Extract flame sensor value from the latest entry
    const flameValue = dataFlame.feeds[1].field3; // Assuming flame data is in field3
    console.log("Flame Sensor Value:", flameValue);

    // Update flame sensor
    updateFlameSensor(flameValue);

    // Fetch temperature sensor data
    const responseTemp = await fetch(urlTemp);
    const dataTemp = await responseTemp.json();

    // Extract temperature value from the latest entry
    const tempValue = dataTemp.feeds[0].field1; // Assuming temperature data is in field1
    console.log("Temperature Sensor Value:", tempValue);

    // Update temperature sensor
    updateTempSensor(tempValue);

    console.log("Alarm State:", alarmState.textContent);
    console.log("Initial Flame Detected:", initialFlameDetected);
    console.log("Initial Temperature Exceeded:", initialTemperatureExceeded);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


// Call fetchDataAndUpdateSensors initially to fetch and display data
fetchDataAndUpdateSensors();

setInterval(fetchDataAndUpdateSensors,15000)

// Set interval to fetch data periodically (every 5 seconds in this example
