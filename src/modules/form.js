function initFormValidation() {
  const form = document.getElementById("signup-form");
  const fields = form.elements;
  const successMsg = document.getElementById("form-success");

  const errors = {
    email: "Please enter a valid email.",
    country: "Country is required.",
    postal: "Postal code must be 5 digits.",
    password: "Password must be at least 6 characters.",
    confirm: "Passwords must match.",
  };

  function showError(name, message) {
    document.getElementById(`error-${name}`).textContent = message;
  }

  function clearError(name) {
    document.getElementById(`error-${name}`).textContent = "";
  }

  function validateField(field) {
    const name = field.name;
    const value = field.value.trim();

    if (name === "confirm") {
      const password = fields["password"].value;
      if (value !== password) {
        showError(name, errors[name]);
        return false;
      }
    }

    if (!field.checkValidity()) {
      showError(name, errors[name]);
      return false;
    }

    clearError(name);
    return true;
  }

  for (let field of form.elements) {
    if (field.tagName !== "INPUT") continue;

    field.addEventListener("input", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allValid = true;
    for (let field of form.elements) {
      if (field.tagName !== "INPUT") continue;
      const valid = validateField(field);
      if (!valid) {
        allValid = false;
      }
    }

    if (allValid) {
      successMsg.classList.remove("hidden");
      form.reset();
      setTimeout(() => successMsg.classList.add("hidden"), 5000);
    }
  });
}

export { initFormValidation };
