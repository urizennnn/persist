'use strict';

const interestForm = document.getElementById("interestForm")

async function getLocationInfo() {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // Handle the position data here
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude)

      // Call the function to get location information
      await displayLocationInfo(latitude, longitude);
    } catch (error) {
      console.error("Error getting position:", error);
      alert("Could not get position");
    }
  } else {
    alert("Geolocation is not supported in this browser.");
  }
}

async function displayLocationInfo(latitude, longitude) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Access the location information from the 'data' object
    const location = data.address.county
    const newLocattion = location.slice(0,4)
    localStorage.setItem("Location" ,newLocattion)
    console.log("Location:", newLocattion);
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}
// Function to handle form submission
interestForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the form data
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const info = document.querySelector("#contact").value;

  // Get shared activities data
  const sharedActivities = [];
  const sharedActivityCheckboxes = document.querySelectorAll('input[name="sharedActivity"]:checked');
  sharedActivityCheckboxes.forEach(checkbox => sharedActivities.push(checkbox.value));
  const sharedActivityDropboxes = document.querySelectorAll('select[name="sharedActivity"]');
  sharedActivityDropboxes.forEach(dropbox => sharedActivities.push(dropbox.value));

  // Remove empty items from the sharedActivities array
  const nonEmptySharedActivities = sharedActivities.filter(item => item !== "");

  // Get favors data
  const favors = [];
  const favorCheckboxes = document.querySelectorAll('input[name="Favors"]:checked');
  favorCheckboxes.forEach(checkbox => favors.push(checkbox.value));
  const favorDropBoxes = document.querySelectorAll('select[name="Favors"]');
  favorDropBoxes.forEach(dropbox => favors.push(dropbox.value));

  // Remove empty items from the favors array
  const nonEmptyFavors = favors.filter(item => item !== "");

  // Process the form data (you can send it to the server or display it)
  localStorage.setItem("Name:", name);
  localStorage.setItem("Shared Activities:", JSON.stringify(nonEmptySharedActivities));
  localStorage.setItem("Favors:", JSON.stringify(nonEmptyFavors));
  localStorage.setItem("Contact", info);

  // You can perform additional actions with the collected data as needed


    // Call the main function to get the location information
  getLocationInfo()


})