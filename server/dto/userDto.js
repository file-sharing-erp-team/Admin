module.exports = class UserDto {
    id;
    email;
    first_name;
    last_name;
    isActivated;
    role;

    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.isActivated = user.isActivated;
        this.role = user.role;
    }
};
