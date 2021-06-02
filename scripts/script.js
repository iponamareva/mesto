const popup = document.querySelector(".popup");
const addPopup = document.querySelector(".add-popup");

const formElement = document.querySelector('.popup__form');
const username = document.querySelector(".profile__username");
const bio = document.querySelector(".profile__bio");

const updUsername = document.querySelector('.popup__input_type_username');
const updBio = document.querySelector('.popup__input_type_bio');

const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = document.querySelector(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const closeAddButton = document.querySelector(".add-popup__close-button");

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

function openPopup() {
    updUsername.value = username.textContent;
    updBio.value = bio.textContent;
    popup.classList.add('popup_opened');
    console.log('popup opened');
}

function openAddPopup() {
    // updUsername.value = username.textContent;
    // updBio.value = bio.textContent;
    addPopup.classList.add('add-popup_opened');
    console.log('add-popup opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
    console.log('popup closed');
}

function closeAddPopup() {
    addPopup.classList.remove('add-popup_opened');
    console.log('add-popup closed');
}

function submitFormHandler(evt) {
    evt.preventDefault();
    username.textContent = updUsername.value;
    bio.textContent = updBio.value;
    closePopup();
}

formElement.addEventListener('submit', submitFormHandler);

editButton.addEventListener('click', openPopup);
closeEditButton.addEventListener('click', closePopup);

addButton.addEventListener('click', openAddPopup);
closeAddButton.addEventListener('click', closeAddPopup);