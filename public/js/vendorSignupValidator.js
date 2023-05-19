const signupForm = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const businessNameInput = document.getElementById("businessName");
const businessAddressInput = document.getElementById("businessAddress");

signupForm.addEventListener("submit", (ev) => {
  if (!validateInputs()) {
    //HTMLFormElement.prototype.submit.call(signupForm);
    ev.preventDefault();
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
  const businessName = businessNameInput.value.trim();
  const businessAddress = businessAddressInput.value.trim();

  let isValid = true;
  if (username === "") {
    setError(usernameInput, "Username name is required!");
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
    isValid = false;
  } else if (password.length < 8 || password.length > 20) {
    setError(passwordInput, "Password length must be 8 to 20 characters!");
    isValid = false;
  } else if (
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/
    )
  ) {
    setError(
      passwordInput,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!"
    );
    isValid = false;
  } else {
    setSuccess(passwordInput);
  }

  if (businessName == "") {
    setError(businessNameInput, "Business name is required!");
    isValid = false;
  } else if (businessName.length < 5) {
    setError(
      businessNameInput,
      "Business name must be more than 5 characters!"
    );
    isValid = false;
  } else {
    setSuccess(businessNameInput);
  }

  if (businessAddress === "") {
    setError(businessAddressInput, "Business address is required!");
    isValid = false;
  } else if (businessAddress.length < 5) {
    setError(
      businessAddressInput,
      "Business address must be more than 5 characters!"
    );
    isValid = false;
  } else {
    setSuccess(businessAddressInput);
  }

  return isValid;
};
