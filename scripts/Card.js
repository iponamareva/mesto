import { openPopup, imagePopup, popupImage, popupPlaceName} from "./index.js"

export class Card {

    constructor(data, cardSelector) {
        this._text = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const newCardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
        return newCardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__item-image').src = this._image;
        this._element.querySelector('.elements__item-image').alt = this._text;
        this._element.querySelector('.elements__item-name').textContent = this._text;

        this._setEventListeners();
        return this._element;
    }
    
    _toggleLike() {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }

    _deleteCard() {
        this._removeEventListeners();
        this._element.remove();
    }

    _openImage() {
        popupImage.src = this._element.querySelector('.elements__item-image').src;
        popupImage.alt = this._element.querySelector('.elements__item-name').textContent;
        popupPlaceName.textContent = this._element.querySelector('.elements__item-name').textContent;

        openPopup(imagePopup);
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener(
            'click', () => this._toggleLike());
        this._element.querySelector('.elements__delete-button').addEventListener(
            'click', () => this._deleteCard());
        this._element.querySelector('.elements__item-image').addEventListener(
            'click', () => this._openImage());
    }

    _removeEventListeners() {
        this._element.querySelector('.elements__like-button').removeEventListener(
            'click', () => this._toggleLike());
        this._element.querySelector('.elements__delete-button').removeEventListener(
            'click', () => this._deleteCard());
        this._element.querySelector('.elements__item-image').removeEventListener(
            'click', () => this._openImage());
    }
}