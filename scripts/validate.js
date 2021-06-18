const showInputError = (formElement, inputElement, errorMessage, valObj) => {
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.add(valObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(valObj.errorClass);
  };
  
const hideInputError = (formElement, inputElement, valObj) => {
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.remove(valObj.inputErrorClass);
    errorElement.classList.remove(valObj.errorClass);
    errorElement.textContent = '';
};
  
const isValid = (formElement, inputElement, valObj) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, valObj);
    } else {
      hideInputError(formElement, inputElement, valObj);
    }
};
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};
  
const toggleButtonState = (inputList, buttonElement, valObj) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(valObj.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(valObj.inactiveButtonClass);
      buttonElement.disabled = false;
    }
};
  
const setEventListeners = (formElement, valObj) => {
    const inputList = Array.from(formElement.querySelectorAll(valObj.inputSelector));
    const buttonElement = formElement.querySelector(valObj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, valObj);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, valObj);
        toggleButtonState(inputList, buttonElement, valObj);
      });
    });
}; 
  
const enableValidation = (valObj) => {
    const formList = Array.from(document.querySelectorAll(valObj.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, valObj);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});