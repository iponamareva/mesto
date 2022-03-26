export default class Card {

    constructor(data, myUserId, cardSelector, handlers) {
        this._id = data._id;
        this._text = data.name;
        this._image = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._myUserId = myUserId;

        this._updateLikeIds();
        
        this._cardSelector = cardSelector;

        this._handleCardClick = handlers.handleCardClick;
        this._handleLike = handlers.handleLike;
        this._handleUnlike = handlers.handleUnlike;
        this._handleDeleteButtonClick = handlers.handleDeleteButtonClick;
        this._handleDelete = handlers.handleDelete;

        this.isLikedByMe = this._likeIds.includes(this._myUserId);
        this._isOwner = this._ownerId === this._myUserId;
    }

    _updateLikeIds() {
        this._likeIds = []
        this._likes.forEach(element => {
            this._likeIds.push(element._id);
        });
    }

    _updateLikes(likes) {
        this._likes = likes;
        this._updateLikeIds();
        this._numLikes.textContent = this._likes.length;
        this.isLikedByMe = this._likeIds.includes(this._myUserId);
        this._adjustLikeButton();
    }

    _getTemplate() {
        const newCardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
        return newCardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        
        this._cardImage = this._element.querySelector('.elements__item-image');
        this._cardTitle = this._element.querySelector('.elements__item-name');
        this._numLikes = this._element.querySelector('.elements__like-number');
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._deleteButton = this._element.querySelector('.elements__delete-button');

        if (!this._isOwner) {
            this._deleteButton.classList.add('elements__delete-button_hidden');
        }

        this._cardImage.src = this._image;
        this._cardImage.alt = this._text;
        this._cardTitle.textContent = this._text;
        this._numLikes.textContent = this._likes.length;

        this._adjustLikeButton();

        this._setEventListeners();

        return this._element;
    }
    
    _adjustLikeButton() {
        if (this.isLikedByMe) {
            this._likeButton.classList.add('elements__like-button_active');
        } else {
            this._likeButton.classList.remove('elements__like-button_active');
        }
    }

    _openImage() {
        this._handleCardClick({image: this._image, text: this._text});
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            if (this.isLikedByMe) {
                this._handleUnlike(this._id)
                .then(res => {
                    this._updateLikes(res.likes);
                })
                .catch((res) => {
                    console.log(`Sever error: couldn't like ${res}`);
                });
            } else {
                this._handleLike(this._id)
                .then(res => {
                    this._updateLikes(res.likes);
                })
                .catch((res) => {
                    console.log(`Sever error: couldn't like ${res}`);
                });
            }
        });

        if (this._isOwner) {
            // this._deleteButton.addEventListener('click', () => this._deleteCard());
            this._deleteButton.addEventListener('click', () => {
                this._handleDeleteButtonClick(this._id, this._element)
            });
            
        }
        this._cardImage.addEventListener('click', () => this._openImage());
    }
}