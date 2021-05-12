let popup = document.querySelector(".popup");

// debugger;

function openPopup() {
    popup.classList.add('popup_opened');
    console.log('popup opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
    console.log('popup closed');
}

let editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', openPopup);

let closeButton = document.querySelector(".popup__close-button");
closeButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__form');

let username = document.querySelector(".profile__username");
let bio = document.querySelector(".profile__bio");


formElement.addEventListener('submit', function(evt) {
    evt.preventDefault();
    console.log('Form sent');
    let updUsername = document.querySelector('.popup__input-username');
    let updBio = document.querySelector('.popup__input-bio');
    username.textContent = updUsername.value;
    bio.textContent = updBio.value;
});