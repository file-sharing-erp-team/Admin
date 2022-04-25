const Router = require("express")
const router = new Router
const UserController = require("../controllers/userController")
const {body} = require("express-validator");

//  http://localhost:7000/ecosystem-adm/user/createUser
router.post(
    "/createUser",
    body("email").isEmail(),
    body("password").isLength({min:8, max:24}),
    body("role").exists(),
    body("first_name").isLength({min:3, max:20}),
    body("middle_name").isLength({min:3, max:20}),
    body("last_name").isLength({min:3, max:20}),
    UserController.createUser
);

//  http://localhost:7000/ecosystem-adm/user/setFIO
router.post(
    "/setFIO", 
    body("userId").exists(),
    body("first_name").isLength({min:3, max:20}),
    body("middle_name").isLength({min:3, max:20}),
    body("last_name").isLength({min:3, max:20}),
    UserController.setFIO
);

module.exports = router