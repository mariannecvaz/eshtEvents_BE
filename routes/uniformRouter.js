const Router = require("express").Router
const middleware = require("../Middleware")
var router = Router()
 
const controller = require("../controllers/EventReservation/uniform/uniformController")

router.get("/uniforms", controller.getUniform)
router.get("/uniforms/:id", controller.getUniformId)


module.exports = router