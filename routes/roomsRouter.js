const Router = require("express").Router
var router = Router()
 
const controller = require("../controllers/Rooms/roomsControllers")
router.post("/rooms", controller.addRooms)
router.delete("/rooms/:id", controller.removeRooms)
router.put("/rooms/:id", controller.updateRooms)

module.exports = router