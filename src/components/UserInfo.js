export default class UserInfo {
    constructor(usernameSelector, bioSelector) {
        this._usernameSelector = usernameSelector; // username
        this._bioSelector = bioSelector; // bio
        this._usernameElement = document.querySelector(this._usernameSelector);
        this._bioElement = document.querySelector(this._bioSelector);
    }

    getUserInfo() {
        return {
            name: this._usernameElement.textContent,
            bio: this._bioElement.textContent
        }
    }

    setUserInfo({username, bio}) {
        this._usernameElement.textContent = username;
        this._bioElement.textContent = bio;
    }
}