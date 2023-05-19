const signupForm = document.getElementById("signup-form")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const nameInput = document.getElementById("name")
const addressInput = document.getElementById("address")

const businessNameInput = document.getElementById("businessName")
const businessAddressInput = document.getElementById("businessNameAddress")

const distributionHubInput = document.getElementById("distributionHub")

signupForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
  validateInputs();
})

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
  let errors = 0;
  const username = usernameInput.value.trim()
  const password = passwordInput.value.trim()
  const name = nameInput.value.trim()
  const address = addressInput.value.trim()
  const businessName = businessNameInput.value.trim()
  const businessAddress = businessAddressInput.value.trim()
  const distributionHub = distributionHubInput.value.trim()

  if (username === "") {
    setError(usernameInput, "Username name is required!");
    errors += 1
  } else {
    setSuccess(usernameInput);
  }

  if (password == "") {
    setError(passwordInput, "Password is required!");
    errors += 1
  } else {
    setSuccess(passwordInput);
  }

  if (name === "") {
    setError(nameInput, "Name is required!");
    errors += 1
  } else {
    setSuccess(nameInput);
  }

  if (errors == 0) {
    productCreatorForm.submit()
  }

  console.log('hi')
};