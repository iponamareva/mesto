import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this.handleFormSubmit = handleFormSubmit;
    }

    setHandledArguments(arg1, arg2) {
        this._arg1 = arg1;
        this._arg2 = arg2;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._arg1, this._arg2);
            this.close();
        });
        super.setEventListeners();
    }
}