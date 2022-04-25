const Router = require("express")
const router = new Router
const GroupController = require("../controllers/groupController")

//  http://localhost:7000/ecosystem-adm/group/getAllGroups
router.get("/getAllGroups", GroupController.getAllGroups)

//  http://localhost:7000/ecosystem-adm/group/getGroupById/:id
router.get("/getGroupById/:id", GroupController.getGroupById)

//  http://localhost:7000/ecosystem-adm/group/createGroup
router.post("/createGroup", GroupController.createGroup)

//  http://localhost:7000/ecosystem-adm/group/addUserToGroup
router.post("/addUserToGroup", GroupController.addUserToGroup)

module.exports = router