export default class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.profileInfoUrl = options.profileInfoUrl;
      this.headers = options.headers;

      this.likeCard = this.likeCard.bind(this);
      this.unlikeCard = this.unlikeCard.bind(this);
      this.deleteCard = this.deleteCard.bind(this);
    }

    getProfileInfo() {
        return fetch(this.profileInfoUrl, {
            method: 'GET',
            headers: this.headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
  
    getInitialCards() {
        console.log(`${this.baseUrl}/cards`);

        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
      }
  
    updateProfileInfo({name, about}) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    updateAvatar(link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-37/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });     
    }

    addCard(cardData) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    
    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    unlikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
  }
