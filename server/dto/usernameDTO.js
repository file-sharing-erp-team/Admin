module.exports = class UsernameDto {
    id;
    first_name;
    last_name;

    constructor(user) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
    }
};
