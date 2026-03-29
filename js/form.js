window.AppForm = (function () {
  const studentForm = document.querySelector("#student-form");
  const formMessage = document.querySelector("#form-message");

  const formFields = {
    name: {
      input: document.querySelector("#new-student-name"),
      error: document.querySelector("#name-error"),
      message: "Введіть ім'я студента."
    },
    group: {
      input: document.querySelector("#new-student-group"),
      error: document.querySelector("#group-error"),
      message: "Оберіть групу."
    },
    status: {
      input: document.querySelector("#new-student-status"),
      error: document.querySelector("#status-error"),
      message: "Оберіть статус."
    }
  };

  function setFieldError(fieldName, message) {
    const field = formFields[fieldName];

    if (!field || !field.input || !field.error) {
      return;
    }

    field.error.textContent = message;
    field.input.classList.toggle("input-error", Boolean(message));
  }

  function clearFormErrors() {
    Object.keys(formFields).forEach((fieldName) => setFieldError(fieldName, ""));

    if (formMessage) {
      formMessage.textContent = "";
      formMessage.classList.remove("error");
    }
  }

  function validateForm() {
    let isValid = true;

    Object.entries(formFields).forEach(([fieldName, field]) => {
      const value = field.input ? field.input.value.trim() : "";

      if (!value) {
        setFieldError(fieldName, field.message);
        isValid = false;
        return;
      }

      setFieldError(fieldName, "");
    });

    return isValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearFormErrors();

    if (!validateForm()) {
      if (formMessage) {
        formMessage.textContent = "Заповніть усі обов'язкові поля.";
        formMessage.classList.add("error");
      }

      return;
    }

    if (formMessage) {
      formMessage.textContent = "Форму успішно заповнено.";
      formMessage.classList.remove("error");
    }
  }

  function handleReset() {
    window.setTimeout(clearFormErrors, 0);
  }

  function init() {
    if (!studentForm) {
      return;
    }

    studentForm.addEventListener("submit", handleSubmit);
    studentForm.addEventListener("reset", handleReset);
  }

  return { init };
})();
