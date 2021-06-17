const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const editFormElement = editPopup.querySelector('.popup__form');
const addFormElement = addPopup.querySelector('.popup__form');

const username = document.querySelector(".profile__username");
const bio = document.querySelector(".profile__bio");
const updUsername = document.querySelector('.popup__input_type_username');
const updBio = document.querySelector('.popup__input_type_bio');

const newImgLink = document.querySelector('.popup__input_type_img-link');
const newPlaceName = document.querySelector('.popup__input_type_place-name');

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
const cardsRendered = document.querySelector('.elements');

function createCard(link, name) {
    const newCardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    newCardElement.querySelector('.elements__item-image').src = link;
    newCardElement.querySelector('.elements__item-image').alt = name;
    newCardElement.querySelector('.elements__item-name').textContent = name;
    addSingleELs(newCardElement);
    return newCardElement;
}

function addCard(link, name) {
    const newCardElement = createCard(link, name);
    cardsRendered.prepend(newCardElement);
}

function renderInitialCards() {
    console.log('LOG: rendering initial cards');
    for (let i = initialCards.length - 1; i >= 0; i -= 1) {
        const link = initialCards[i].link;
        const name = initialCards[i].name;
        
        addCard(link, name); 
    }
}

function toggleLike(likeButton) {
    console.log('LOG: togglelike function called');
    likeButton.classList.toggle('elements__like-button_active');
}

function deleteCard(deleteButton) {
    const listItem = deleteButton.closest('.elements__item');
    listItem.remove();
    console.log('delete button pressed');
}

function openImage(image) {
    const listItem = image.closest('.elements__item');
    popupImage.src = listItem.querySelector('.elements__item-image').src;
    popupImage.alt = listItem.querySelector('.elements__item-name').textContent;
    popupPlaceName.textContent = listItem.querySelector('.elements__item-name').textContent;
    openPopup(imagePopup);
}

// навесить обработчики на элементы новой карточки
function addSingleELs(newCardElement) {
    const newLikeButton = newCardElement.querySelector('.elements__like-button');
    newLikeButton.addEventListener('click', () => toggleLike(newLikeButton));
    const newDeleteButton = newCardElement.querySelector('.elements__delete-button');
    newDeleteButton.addEventListener('click', () => deleteCard(newDeleteButton));
    const newImage = newCardElement.querySelector('.elements__item-image');
    newImage.addEventListener('click', () => openImage(newImage));
}


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openAndFillEditPopup() {
    console.log("LOG: edit popup opened");
    updUsername.value = username.textContent;
    updBio.value = bio.textContent;
    openPopup(editPopup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function submitEditFormHandler(evt) {
    evt.preventDefault();
    username.textContent = updUsername.value;
    bio.textContent = updBio.value;
    closePopup(editPopup);
    console.log("LOG: form submitted, edit popup closed");
}

function submitAddFormHandler(evt) {
    evt.preventDefault();
    const link = newImgLink.value;;
    const name = newPlaceName.value;
    addCard(link, name);
    addFormElement.reset();
    closePopup(addPopup);
    console.log('LOG: new card added, add popup closed');
}

// submit form handlers
editFormElement.addEventListener('submit', submitEditFormHandler);
addFormElement.addEventListener('submit', submitAddFormHandler);

// open/close popups
editButton.addEventListener('click', openAndFillEditPopup);
closeEditButton.addEventListener('click', () => closePopup(editPopup));
addButton.addEventListener('click', () => openPopup(addPopup));
closeAddButton.addEventListener('click', () => closePopup(addPopup));
closeImageButton.addEventListener('click', () => closePopup(imagePopup));

// render initial cards and add event listeners for them
renderInitialCards();