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
    try {
      usernameValidation(registrationForm.elements.username.value);
      emailValidation(registrationForm.elements.email.value);
    } catch (err) {
      displayError(err.message);
      console.log(err);
    }
  }

  // Registration Form - Username Validation:
  function usernameValidation(username) {
    //The username cannot be blank.
    if (username === "") {
      throw new Error("The username cannot be blank.");
    }
    //The username must be at least four characters long.
    if (username.length < 4) {
      throw new Error("The username must be at least four characters long.");
    }
    //The username must contain at least two unique characters.
    if (username.match(/^(.)\1+$/)) {
      throw new Error(
        "The username must contain at least two unique characters."
      );
    }
    //The username cannot contain any special characters or whitespace.
    if (username.match(/\s|\W/)) {
      throw new Error(
        "The username cannot contain any special characters or whitespace."
      );
    }
  }

  // Registration Form - Email Validation:
  function emailValidation(email) {
    //The email must be a valid email address.
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)) {
      throw new Error("The email must be a valid email address.");
    }
    //The email must not be from the domain "example.com"
    if (email.match(/example\.com$/i)) {
      throw new Error('The email must not be from the domain "example.com"');
    }
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
