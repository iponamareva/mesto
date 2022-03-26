import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this.handleFormSubmit = handleFormSubmit;
    }

    setHandledArguments(args) {
        this._args = args;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._args);
        });
        super.setEventListeners();
    }
}