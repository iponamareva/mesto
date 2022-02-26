export default class Card {

    constructor(data, cardSelector, handleCardClick) {
        this._text = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const newCardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
        return newCardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        
        this._cardImage = this._element.querySelector('.elements__item-image');
        this._cardTitle = this._element.querySelector('.elements__item-name');
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._deleteButton = this._element.querySelector('.elements__delete-button');

        this._cardImage.src = this._image;
        this._cardImage.alt = this._text;
        this._cardTitle.textContent = this._text;

        this._setEventListeners();

        return this._element;
    }
    
    _toggleLike() {
        this._likeButton.classList.toggle('elements__like-button_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    _openImage() {
        this._handleCardClick({image: this._image, text: this._text});
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._toggleLike());
        this._deleteButton.addEventListener('click', () => this._deleteCard());
        this._cardImage.addEventListener('click', () => this._openImage());
    }
}