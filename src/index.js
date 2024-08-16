const handleLoad = () => {
  const errorDisplay = document.getElementById("errorDisplay");
  const registrationForm = document.getElementById("registration");
  const loginForm = document.getElementById("login");
  // use helper function to handle form submit
  registrationForm.addEventListener("submit", validateRegistration);

  /** HELPER FUNCTIONS */
  function validateRegistration(event) {
    // prevent default submit logic
    event.preventDefault();
    displayError("test error");
  }

  function displayError(error) {
    errorDisplay.textContent = error;
    errorDisplay.style.display = "block";
    setTimeout(() => {
      errorDisplay.style.display = "none";
    }, 2000);
  }
};

window.addEventListener("load", handleLoad);
