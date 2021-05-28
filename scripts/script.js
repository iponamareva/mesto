let popup = document.querySelector(".popup");
let formElement = document.querySelector('.popup__form');
let username = document.querySelector(".profile__username");
let bio = document.querySelector(".profile__bio");

let updUsername = document.querySelector('.popup__input_type_username');
let updBio = document.querySelector('.popup__input_type_bio');

let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");

function openPopup() {
    updUsername.value = username.textContent;
    updBio.value = bio.textContent;
    popup.classList.add('popup_opened');
    console.log('popup opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
    console.log('popup closed');
}

function submitFormHandler(evt) {
    evt.preventDefault();
    username.textContent = updUsername.value;
    bio.textContent = updBio.value;
    closePopup();
}

formElement.addEventListener('submit', submitFormHandler);

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);