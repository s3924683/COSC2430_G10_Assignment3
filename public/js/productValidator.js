const productCreatorForm = document.getElementById("product-creator");
const formName = document.getElementById("name");
const formPrice = document.getElementById("price");
const formCategory = document.getElementById("category")
const formDescription = document.getElementById("description");

productCreatorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
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
  let errors = 0;
  const formNameValue = formName.value.trim();
  const formPriceValue = formPrice.value.trim();

  console.log(productCreatorForm)
  if (formNameValue === "") {
    setError(formName, "Product name is required!");
    errors += 1
  } else if (formNameValue.length < 10 || formNameValue.length > 20) {
    setError(formName, "Product name must be 10 to 20 characters!");
    errors += 1
  } else {
    setSuccess(formName);
  }

  if (formPriceValue == 0) {
    setError(formPrice, "Product price is required!");
    errors += 1
  } else if (formPriceValue < 0) {
    setError(formPrice, "Product price must be a positive value!");
    errors += 1
  } else {
    setSuccess(formPrice);
  }

  if (formDescription.value.length > 500) {
    setError(formDescription, "Max length is 500!");
    errors += 1
  } else {
    setSuccess(formDescription);
  }

  if (errors == 0) {
    productCreatorForm.submit()
  }
};
