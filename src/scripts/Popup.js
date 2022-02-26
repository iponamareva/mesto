export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._closeButton = this._popup.querySelector(".popup__close-button");
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
          this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened'); 
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
        document.addEventListener('click', (evt) => {this._handleOverlayClick(evt)});
    }
}