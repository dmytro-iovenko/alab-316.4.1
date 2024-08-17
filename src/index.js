const handleLoad = () => {
  const errorDisplay = document.getElementById("errorDisplay");
  const registrationForm = document.getElementById("registration");
  const loginForm = document.getElementById("login");
  const storage = window.localStorage;
  // handle Registration Form submission
  registrationForm.addEventListener("submit", handleRegistration);
  // handle Login Form submission
  loginForm.addEventListener("submit", handleLogin);

  /** HELPER FUNCTIONS */
  function handleRegistration(event) {
    // prevent default submit logic
    event.preventDefault();
    try {
      // Perform Username Validation
      const username = registrationForm.elements.username.value;
      validateUsername(username);
      // Perform Email Validation
      const email = registrationForm.elements.email.value;
      validateEmail(email);
      // Perform Password Validation
      const password = registrationForm.elements.password.value;
      const passwordCheck = registrationForm.elements.passwordCheck.value;
      validatePassword(password, passwordCheck, username);
      // Perform Terms and Conditions Validation
      const terms = registrationForm.elements.terms;
      validateTermsAndConditions(terms);

      /** Registration Form - Form Submission */
      // Valid usernames should be converted to all lowercase before being stored.
      const usernameLC = username.toLowerCase();
      // Valid emails should be converted to all lowercase before being stored.
      const emailLC = email.toLowerCase();
      // If all validation is successful, store the username, email, and password using localStorage.
      storage.setItem(
        usernameLC,
        JSON.stringify({
          username: usernameLC,
          email: emailLC,
          password: password,
        })
      );
      // Clear all form fields after successful submission
      registrationForm.reset();
      //  and show a success message.
      alert("You succesfully registered!!!");
    } catch (err) {
      displayError(err.message);
      console.log(err);
    }
  }

  // Registration Form - Username Validation:
  function validateUsername(username) {
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
    // Username must be unique ("that username is already taken" error)
    const usernameLC = username.toLowerCase();
    if (storage[usernameLC]) {
      throw new Error("That username is already taken.");
    }
  }

  // Registration Form - Email Validation:
  function validateEmail(email) {
    //The email must be a valid email address.
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)) {
      throw new Error("The email must be a valid email address.");
    }
    //The email must not be from the domain "example.com"
    if (email.match(/example\.com$/i)) {
      throw new Error('The email must not be from the domain "example.com"');
    }
  }

  // Registration Form - Password Validation:
  function validatePassword(password, passwordCheck, username) {
    //Passwords must be at least 12 characters long.
    if (password.length < 12) {
      throw new Error("Passwords must be at least 12 characters long.");
    }
    //Passwords must have at least one uppercase and one lowercase letter.
    if (!password.match(/[a-z].*?[A-Z]|[A-Z].*?[a-z]/)) {
      throw new Error(
        "Passwords must have at least one uppercase and one lowercase letter."
      );
    }
    //Passwords must contain at least one number.
    if (!password.match(/[0-9]/)) {
      throw new Error("Passwords must contain at least one number.");
    }
    //Passwords must contain at least one special character.
    if (!password.match(/\W/)) {
      throw new Error("Passwords must contain at least one special character.");
    }
    //Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    if (password.match(/password/i)) {
      throw new Error(
        'Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).'
      );
    }
    //Passwords cannot contain the username.
    if (password.match(new RegExp(username, "i"))) {
      throw new Error("Passwords cannot contain the username.");
    }
    //Both passwords must match.
    if (password !== passwordCheck) {
      throw new Error("Both passwords must match.");
    }
  }

  // Registration Form - Terms and Conditions:
  function validateTermsAndConditions(checkbox) {
    //The terms and conditions must be accepted.
    if (!checkbox.checked) {
      throw new Error("The terms and conditions must be accepted.");
    }
  }

  function handleLogin(event) {
    // prevent default submit logic
    event.preventDefault();
    try {
      // Perform Username Validation
      const username = loginForm.elements.username.value;
      validateUsername(username);
    } catch (err) {
      displayError(err.message);
      console.log(err);
    }

    /** Login Form - Username Validation */
    function validateUsername(username) {
      //The username cannot be blank.
      if (username === "") {
        throw new Error("The username cannot be blank.");
      }
      // The username must exist (within localStorage)
      const usernameLC = username.toLowerCase();
      if (!storage[usernameLC]) {
        throw new Error("That username does not exist.");
      }
      console.log("Login Form - Username Validation: OK");
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
