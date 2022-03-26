import './index.css';

import {
    defaultCards,
    validationConfig,
    editButton,
    addButton,
    avatarButton,
    apiConfig } from "../utils/constants.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

const api = new Api(apiConfig);

// setting up form validation
const addFormElement = document.querySelector(".popup_type_new-card").querySelector('.popup__form');
const editFormElement = document.querySelector(".popup_type_edit").querySelector('.popup__form');
const addFormValidator = new FormValidator(validationConfig, addFormElement);
const editFormValidator = new FormValidator(validationConfig, editFormElement);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

// creating and filling UserInfo object
const userInfo = new UserInfo(".profile__username", ".profile__bio", ".profile__image");

api.getProfileInfo()
.then((res) => {
    userInfo.setUserInfo({
        username: res.name,
        bio: res.about,
        avatar: res.avatar,
        id: res._id,
        cohort: res.cohort
    })
})
.catch((res) => {
    console.log(res);
})


function createCard(data) {
    const card = new Card(
        data,
        userInfo.id,
        '#card',
        {
            handleCardClick: () => {imagePopup.open(data)},
            handleLike: api.likeCard,
            handleUnlike: api.unlikeCard,

            handleDeleteButtonClick: (cardId, cardElement) => {
                console.log(cardId);
                confirmPopup.open();
                confirmPopup.setHandledArguments(cardId, cardElement);
            }
        }
    );
    const cardElement = card.generateCard();
    return cardElement;
}

// creating and filling Section object with cards
const section = new Section(
    {items: [], renderer: (data) => {
        return createCard(data);
    }}, 
    '.elements');

api.getInitialCards()
.then((res) => {
    section.setItems(res);
})
.catch((res) => {
    console.log(`Error loading cards: ${res}`);
})
.finally(() => {
    section.renderItems();
});



const handleFormSubmit = {
    // action on edit form submit: uses Api to update data on server
    editForm: ({username, bio}) => {
        api.updateProfileInfo({
            name: username,
            about: bio
        })
        .then((res) => {
            userInfo.setUserInfo({
                username: res.name,
                bio: res.about,
                avatar: res.avatar,
                id: res._id,
                cohort: res.cohort
            });
            editPopup.close();
        })
        .catch((res) => {
            console.log(`${res}. Profile info not updated!`)
        }) 
    },

    addForm: (inputObj) => {
        api.addCard({
            name : inputObj["place-name"],
            link : inputObj["img-link"]
        })
        .then((res) => {
            const card = createCard(res);
            section.addItem(card);
        })
        .catch(res => {console.log(res)});
        
        addFormValidator.deactivateButton();
    },

    editAvatarForm: (inputObj) => {
        api.updateAvatar(inputObj["avatar-link"])
        .then((res) => {
            userInfo.setAvatar({link: res.avatar});
        })
        .catch(res => console.log(res))
    },

    confirmDeleteForm: (cardId, cardElement) => {
        api.deleteCard(cardId)
        .then(res => cardElement.remove())
        .catch(res => console.log(res));
    }
}

// popups
const imagePopup = new PopupWithImage(".popup_type_image");
const editPopup = new PopupWithForm(".popup_type_edit", handleFormSubmit.editForm);
const addPopup = new PopupWithForm(".popup_type_new-card", handleFormSubmit.addForm);
const avatarPopup = new PopupWithForm(".popup_type_edit-avatar", handleFormSubmit.editAvatarForm);
const confirmPopup = new PopupWithConfirm(".popup_type_confirm-delete", handleFormSubmit.confirmDeleteForm);

imagePopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();

editButton.addEventListener('click', () => {
    editPopup.open();
    editFormValidator.deactivateButton();
});
addButton.addEventListener('click', () => {
    addPopup.open();
    addFormValidator.deactivateButton();
});
avatarButton.addEventListener('click', () => {
    avatarPopup.open();
})

