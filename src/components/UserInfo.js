export default class UserInfo {
    constructor(usernameSelector, bioSelector, avatarSelector) {
        this._usernameSelector = usernameSelector; // username
        this._bioSelector = bioSelector; // bio
        this._avatarSelector = avatarSelector;
        this._usernameElement = document.querySelector(this._usernameSelector);
        this._bioElement = document.querySelector(this._bioSelector);
        this._avatarElement = document.querySelector(this._avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._usernameElement.textContent,
            bio: this._bioElement.textContent
        }
    }

    setUserInfo({username, bio, avatar, id, cohort}) {
        this.id = id;
        this._usernameElement.textContent = username;
        this._bioElement.textContent = bio;
        this._cohort = cohort;

        this.setAvatar({link: avatar});
    }

    setAvatar({link}) {
        this._avatarLink = link;
        this._avatarElement.src = this._avatarLink;
    }
}