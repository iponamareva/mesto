import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const editFormElement = editPopup.querySelector('.popup__form');
const addFormElement = addPopup.querySelector('.popup__form');

const username = document.querySelector(".profile__username");
const bio = document.querySelector(".profile__bio");
const inputName = document.querySelector('.popup__input_type_username');
const inputBio = document.querySelector('.popup__input_type_bio');

const inputCardLink = document.querySelector('.popup__input_type_img-link');
const inputCardName = document.querySelector('.popup__input_type_place-name');

const popupImage = document.querySelector('.popup__image');
const popupPlaceName = document.querySelector('.popup__place-name');

const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = editPopup.querySelector(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const closeAddButton = addPopup.querySelector(".popup__close-button");
const closeImageButton = imagePopup.querySelector(".popup__close-button");

const submitAddButton = addFormElement.querySelector('.popup__submit-button');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const cardsList = document.querySelector('.elements');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const addFormValidator = new FormValidator(validationConfig, addFormElement);
const editFormValidator = new FormValidator(validationConfig, editFormElement);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

function createCard(data) {
    const card = new Card(data, '#card');
    const cardElement = card.generateCard();
    return cardElement
}

function addCard(data) {
    const newCardElement = createCard(data)
    cardsList.prepend(newCardElement);
}

function renderInitialCards() {
    for (let i = initialCards.length - 1; i >= 0; i -= 1) {
        addCard(initialCards[i]);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('click', handleOverlayClick);
}

function openEditProfilePopup() {
    inputName.value = username.textContent;
    inputBio.value = bio.textContent;
    editFormValidator.hidePopupErrors();
    openPopup(editPopup);
}

function cleanAddForm() {
  addFormElement.reset();
  addFormValidator.hidePopupErrors();
}

function openAddCardPopup() {
  cleanAddForm();
  openPopup(addPopup);
}

function closePopup(popup) {
    document.removeEventListener('keydown', handleEscKey);
    document.removeEventListener('click', handleOverlayClick);
    popup.classList.remove('popup_opened');
}

function handleProfileEditFormSubmit(evt) {
    evt.preventDefault();
    username.textContent = inputName.value;
    bio.textContent = inputBio.value;
    closePopup(editPopup);
}

function handleProfileAddFormSubmit(evt) {
    evt.preventDefault();
    
    addCard({
        link : inputCardLink.value,
        name : inputCardName.value}
        );
    addFormElement.reset();
    addFormValidator.deactivateButton();
    closePopup(addPopup);
}

function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    findAndCloseOpenedPopup();
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// submit form handlers
editFormElement.addEventListener('submit', handleProfileEditFormSubmit);
addFormElement.addEventListener('submit', handleProfileAddFormSubmit);

// open/close popups
editButton.addEventListener('click', openEditProfilePopup);
closeEditButton.addEventListener('click', () => closePopup(editPopup));
addButton.addEventListener('click', openAddCardPopup);
closeAddButton.addEventListener('click', () => closePopup(addPopup));
closeImageButton.addEventListener('click', () => closePopup(imagePopup));

renderInitialCards();

export {openPopup, imagePopup, popupImage, popupPlaceName} 