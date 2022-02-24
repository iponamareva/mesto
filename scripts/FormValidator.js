export class FormValidator {

    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
      };
      
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.remove(this._validationConfig.errorClass);
        errorElement.textContent = '';
    };
      

    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));

        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    };


    _activateButton = () => {
        const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
    
    _deactivateButton = () => {
        const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    }
    
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._deactivateButton();
        } else {
            this._activateButton();
        }
    };

    _setEventListeners() {
        this._toggleButtonState();
        
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._isValid(inputElement);
            this._toggleButtonState();
          });
        });

    }

    enableValidation() {

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    hidePopupErrors () {
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
      }

}
