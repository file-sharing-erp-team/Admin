module.exports = class AuthDto {
    id;
    email;
    isActivated;
    role;

    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.isActivated = user.isActivated;
        this.role = user.role;
    }
};
