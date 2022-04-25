const Router = require("express")
const router = new Router

const AuthRouter = require("./authRouter")
const GroupRouter = require("./groupRouter")
const UserRouter = require("./userRouter")

//  http://localhost:7000/ecosystem-adm/auth
router.use("/auth", AuthRouter)

//  http://localhost:7000/ecosystem-adm/group
router.use("/group", GroupRouter)

//  http://localhost:7000/ecosystem-adm/user
router.use("/user", UserRouter)

module.exports = router