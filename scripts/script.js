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

const cardTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.elements');

function createCard(link, name) {
    const newCardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const newCardElementImageLink = newCardElement.querySelector('.elements__item-image');
    const newCardElementImageName = newCardElement.querySelector('.elements__item-name');

    newCardElementImageLink.src = link;
    newCardElementImageLink.alt = name;
    newCardElementImageName.textContent = name;
    addCardElements(newCardElement);
    return newCardElement;
}

function addCard(link, name) {
    const newCardElement = createCard(link, name);
    cardsList.prepend(newCardElement);
}

function renderInitialCards() {
    for (let i = initialCards.length - 1; i >= 0; i -= 1) {
        const link = initialCards[i].link;
        const name = initialCards[i].name;
        
        addCard(link, name); 
    }
}

function toggleLike(likeButton) {
    likeButton.classList.toggle('elements__like-button_active');
}

function deleteCard(deleteButton) {
    const card = deleteButton.closest('.elements__item');
    removeCardElements(card);
    card.remove();
}

function openImage(image) {
    const listItem = image.closest('.elements__item');
    const listItemImage = listItem.querySelector('.elements__item-image');
    const listItemTitle = listItem.querySelector('.elements__item-name');

    popupImage.src = listItemImage.src;
    popupImage.alt = listItemTitle.textContent;
    popupPlaceName.textContent = listItemTitle.textContent;
    openPopup(imagePopup);
}

// навесить обработчики на элементы новой карточки
function addCardElements(newCardElement) {
    const newLikeButton = newCardElement.querySelector('.elements__like-button');
    newLikeButton.addEventListener('click', () => toggleLike(newLikeButton));
    const newDeleteButton = newCardElement.querySelector('.elements__delete-button');
    newDeleteButton.addEventListener('click', () => deleteCard(newDeleteButton));
    const newImage = newCardElement.querySelector('.elements__item-image');
    newImage.addEventListener('click', () => openImage(newImage));
}

// снять 
function removeCardElements(cardElement) {
  const likeButton = cardElement.querySelector('.elements__like-button');
  likeButton.removeEventListener('click', () => toggleLike(newLikeButton));
  const deleteButton = cardElement.querySelector('.elements__delete-button');
  deleteButton.removeEventListener('click', () => deleteCard(newDeleteButton));
  const image = cardElement.querySelector('.elements__item-image');
  image.removeEventListener('click', () => openImage(newImage));
}


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escKeyHandler);
    document.addEventListener('click', overlayClosePopup);
}

function openEditProfilePopup() {
    inputName.value = username.textContent;
    inputBio.value = bio.textContent;
    hidePopupErrors(editPopup, validationConfig);
    openPopup(editPopup);
}

function cleanFormIfNeeded(popup) {
  if (popup.classList.contains('popup_type_new-card')) {
    addFormElement.reset();
    hidePopupErrors(popup, validationConfig);
  }
}

function closePopup(popup) {
    document.removeEventListener('keydown', escKeyHandler);
    document.removeEventListener('click', overlayClosePopup);
    cleanFormIfNeeded(popup);
    popup.classList.remove('popup_opened');
}

function submitEditFormHandler(evt) {
    evt.preventDefault();
    username.textContent = inputName.value;
    bio.textContent = inputBio.value;
    closePopup(editPopup);
}

function submitAddFormHandler(evt) {
    evt.preventDefault();
    const link = inputCardLink.value;;
    const name = inputCardName.value;
    addCard(link, name);
    addFormElement.reset();

    const submitButton = addFormElement.querySelector('.popup__submit-button');
    deactivateButton(submitButton, validationConfig);
    
    closePopup(addPopup);
}

function closeAllPopups() {
  closePopup(editPopup);
  closePopup(addPopup);
  closePopup(imagePopup);
}

function findAndCloseOpenedPopup() {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

function escKeyHandler(evt) {
  if (evt.key === 'Escape') {
    findAndCloseOpenedPopup();
  }
}

function overlayClosePopup(evt) {
  if (evt.target.classList.contains('popup')) {
    findAndCloseOpenedPopup();
  }
}

// submit form handlers
editFormElement.addEventListener('submit', submitEditFormHandler);
addFormElement.addEventListener('submit', submitAddFormHandler);

// open/close popups
editButton.addEventListener('click', openEditProfilePopup);
closeEditButton.addEventListener('click', () => closePopup(editPopup));
addButton.addEventListener('click', () => openPopup(addPopup));
closeAddButton.addEventListener('click', () => closePopup(addPopup));
closeImageButton.addEventListener('click', () => closePopup(imagePopup));

renderInitialCards();