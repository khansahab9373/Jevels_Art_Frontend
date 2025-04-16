// Ensure the popup is hidden initially
const successPopup = document.getElementById("successPopup");
successPopup.style.display = "none";
successPopup.style.opacity = 0;

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    dob: formData.get("dob"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  // Basic validation
  if (!data.name || !data.email || !data.password || !data.confirm_password) {
    alert("Please fill in all required fields.");
    return;
  }
  if (data.password !== data.confirm_password) {
    alert("Passwords do not match.");
    return;
  }

  // Send POST request using Fetch API
  fetch("https://jewels-art-backend.vercel.app/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        // Show the success popup with fade-in effect
        successPopup.style.display = "flex";
        setTimeout(() => {
          successPopup.style.opacity = 1; // Fade-in effect
        }, 10); // Small delay to trigger transition
        form.reset(); // Reset form fields after success

        // Hide the popup after 5 seconds
        setTimeout(() => {
          successPopup.style.opacity = 0; // Fade-out effect
          setTimeout(() => {
            successPopup.style.display = "none"; // Hide the popup after fade-out
          }, 500); // Match this time with the transition duration (500ms)
        }, 5000); // Show for 5 seconds
      } else {
        alert("Error: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error processing your request. Please try again later.");
    });
});
