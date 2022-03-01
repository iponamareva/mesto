import './index.css';

import {
    initialCards,
    validationConfig,
    editButton,
    addButton } from "../utils/constants.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

function createCard(data) {
    const card = new Card(data, '#card', () => {imagePopup.open(data)});
    const cardElement = card.generateCard();
    return cardElement;
}

// setting up form validation
const addFormElement = document.querySelector(".popup_type_new-card").querySelector('.popup__form');
const editFormElement = document.querySelector(".popup_type_edit").querySelector('.popup__form');
const addFormValidator = new FormValidator(validationConfig, addFormElement);
const editFormValidator = new FormValidator(validationConfig, editFormElement);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

const userInfo = new UserInfo(".profile__username", ".profile__bio");

const section = new Section(
    {items: initialCards, renderer: (data) => {
        return createCard(data); // создать разметку
    }}, 
    '.elements');
section.renderItems();

const handleFormSubmit = {
    editForm: ({username, bio}) => {
        userInfo.setUserInfo({username, bio});
        editPopup.close();
    },
    addForm: (inputObj) => {
        const card = createCard({
            name : inputObj["place-name"],
            link : inputObj["img-link"]
        });
        section.addItem(card);
        // we need to deactivate submit button after submit
        addFormValidator.deactivateButton();
    }
}

const imagePopup = new PopupWithImage(".popup_type_image");
const editPopup = new PopupWithForm(".popup_type_edit", handleFormSubmit.editForm);
const addPopup = new PopupWithForm(".popup_type_new-card", handleFormSubmit.addForm);
imagePopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();

editButton.addEventListener('click', () => {
    editPopup.open();
    editFormValidator.deactivateButton();
});
addButton.addEventListener('click', () => {
    addPopup.open();
    addFormValidator.deactivateButton();
});