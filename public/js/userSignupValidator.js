const signupForm = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");

signupForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  if (validateInputs()) {
    HTMLFormElement.prototype.submit.call(signupForm);
  }
});

const setError = (element, message) => {
  const formGroup = element.parentElement;
  const errorDisplay = formGroup.querySelector(".error-message");

  errorDisplay.innerText = message;

  formGroup.classList.add("error");
  formGroup.classList.remove("success");
};
const setSuccess = (element) => {
  const formGroup = element.parentElement;
  const errorDisplay = formGroup.querySelector(".error-message");

  errorDisplay.innerText = "";

  formGroup.classList.remove("error");
  formGroup.classList.add("success");
};

const validateInputs = () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const name = nameInput.value.trim();
  const address = addressInput.value.trim();

  let isValid = true;

  if (username === "") {
    setError(usernameInput, "Username is required!");
    isValid = false;
  } else if (username.length < 8 || username.length > 15) {
    setError(usernameInput, "Username must be a length from 8 to 15!");
    isValid = false;
  } else if (!username.match(/^[a-zA-Z0-9]+$/)) {
    setError(usernameInput, "Username cannot contain special characters.");
    isValid = false;
  } else {
    setSuccess(usernameInput);
  }

  if (password == "") {
    setError(passwordInput, "Password is required!");
    errors += 1;
  } else if (password.length < 8 || password.length > 20) {
    setError(passwordInput, "Password length must be 8 to 20 characters!");
    errors += 1;
  } else if (
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/
    )
  ) {
    setError(
      passwordInput,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!"
    );
    errors += 1;
  } else {
    setSuccess(passwordInput);
  }

  if (name === "") {
    setError(nameInput, "Name is required!");
    errors += 1;
  } else {
    setSuccess(nameInput);
  }

  if (address === "") {
    setError(addressInput, "Address is required!");
    errors += 1;
  } else {
    setSuccess(nameInput);
  }

  return isValid;
};
