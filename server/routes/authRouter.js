const Router = require("express");
const router = new Router();
const AuthController = require("../controllers/authController");
const {body, param, cookie} = require("express-validator");

//  http://localhost:7000/ecosystem-adm/auth/login
router.post("/login", 
    body("email").isEmail(),
    body("password").exists().notEmpty(),
    AuthController.login
);

//  http://localhost:7000/ecosystem-adm/auth/activate/:link
router.get("/activate/:link",
    param("link").exists().notEmpty(), 
    AuthController.activate
);

//  http://localhost:7000/ecosystem-adm/auth/logout
router.get("/logout",
    cookie("refreshToken").exists().notEmpty(),  
    AuthController.logout
);

//  http://localhost:7000/ecosystem-adm/auth/refresh
router.get("/refresh",
    cookie("refreshToken").exists().notEmpty(),
    AuthController.refresh
);

module.exports = router;
