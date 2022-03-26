import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this.handleFormSubmit = handleFormSubmit;
        this._inputs = Array.from(this._formElement.querySelectorAll(".popup__input"));
    }

    _getInputValues() {
        const inputValues = {};
        this._inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        })
        return inputValues;
    }

    setInputValues(args) {
        args.forEach((elem) => {
            document.querySelector(elem.inputSelector).value = elem.value;
        })
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        this._formElement.reset();
        super.close();
    }

}