const signupForm = document.getElementById("signup-form")
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const businessNameInput = document.getElementById("businessName")
const businessAddressInput = document.getElementById("businessAddress")

signupForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    validateInputs();
})

const setError = (element, message) => {
    const formGroup = element.parentElement;
    console.log(formGroup)
    const errorDisplay = formGroup.querySelector(".error-message");

    console.log(errorDisplay)
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
    const businessName = businessNameInput.value.trim()
    const businessAddress = businessAddressInput.value.trim()

    if (username === "") {
        setError(usernameInput, "Username name is required!");
        errors += 1
    } else if (username.length < 8 || username.length > 15) {
        setError(usernameInput, "Username must be a length from 8 to 15!");
        errors += 1
    }
    else if (!username.match(/^[a-zA-Z0-9]+$/)) {
        setError(usernameInput, "Username cannot contain special characters.");
        errors += 1
    }
    else {
        setSuccess(usernameInput);
    }

    if (password == "") {
        setError(passwordInput, "Password is required!");
        errors += 1
    } else if (password.length < 8 || password.length > 20) {
        setError(passwordInput, "Password length must be 8 to 20 characters!");
        errors += 1
    }
    else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)) {
        setError(passwordInput, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!");
        errors += 1
    }
    else {
        setSuccess(passwordInput);
    }

    if (businessName === "") {
        setError(businessNameInput, "Business name is required!");
        errors += 1
    } else {
        setSuccess(businessNameInput);
    }

    if (businessAddress === "") {
        setError(businessAddressInput, "Business address is required!");
        errors += 1
    } else {
        setSuccess(businessAddressInput);
    }

    if (errors == 0) {
        console.log('hi')
        signupForm.submit()
    }
};