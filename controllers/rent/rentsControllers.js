const rentsFunctions = require("./rentsFunctions")

function addRents(req, result){
    let id_user = req.body.id_user
    let date_reserv = req.body.date_reserv
    let date_required = req.body.date_required
    let duration = req.body.duration
    let id_room = req.body.id_room

    rentsFunctions.addRents(id_user, date_reserv, date_required, duration, id_room, (error, sucess) => {
        if (error) {
            throw error
            return
        }
        result.json(sucess)
    })
}

module.exports = { addRents: addRents}