export default class FormValidator {

    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
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
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    };

    _activateButton = () => {
        this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }
    
    deactivateButton = () => {
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }
    
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.deactivateButton();
        } else {
            this._activateButton();
        }
    };

    _setEventListeners() {
        this._toggleButtonState();
        
        this._inputList.forEach((inputElement) => {
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
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
    }
}
