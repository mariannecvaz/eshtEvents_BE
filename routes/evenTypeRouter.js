const Router = require("express").Router
var router = Router()

const controller = require("../controllers/EventReservation/evenType/evenTypeController")

router.get("/evenTypes", controller.getEvenType)
router.get("/evenTypes/:id", controller.getEvenTypeID)
module.exports = router