const evenTypeFunctions = require("./evenTypeFunctions")

function addEvenType(req, result) {
    let description = req.body.description
    evenTypeFunctions.addEvenType(description, (error, sucess) => {
        if (error) {
            throw error
            return
        }
        result.json(sucess)
    })

}
function removeEvenType(req, result) {
    let id = req.params.id
    evenTypeFunctions.removeEvenType(id, (error, sucess) => {
        if (error) {
            throw error
            return
        }
        result.json(sucess)
    })

}

module.exports = { addEvenType: addEvenType, removeEvenType: removeEvenType }