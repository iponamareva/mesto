import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._image = document.querySelector('.popup__image');
        this._placeName = document.querySelector('.popup__place-name');
    }

    open({ link, name }) {
        this._image.src = link;
        this._image.alt = name;
        this._placeName.textContent = name;

        super.open();
    }
}