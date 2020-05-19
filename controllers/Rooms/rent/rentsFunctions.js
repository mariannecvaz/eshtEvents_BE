const dbConfig = require("../../../database/dbConfig.json")
const mySql = require("mysql")
var connection = mySql.createConnection(dbConfig)

function addRents(id_user, date_reserv, date_required, duration, id_room, callback) {
    connection.connect()

    const sql = "INSERT INTO aluguer_espaco (id_utilizador, data_hora_aluguer, data_hora_requirida, duracao, id_estado, id_espaco) VALUES (?,?,?,?,?,?)"
    connection.query(sql, [id_user, date_reserv, date_required, duration, 1, id_room], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Aluguer de Espaço Adicionado" })
    })

    connection.end()
}

function removeRents(id, callback) {
    connection.connect()

    const sql = "DELETE FROM aluguer_espaco WHERE id_aluguer = ?"
    connection.query(sql, [id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Aluguer Removido" })
    })

    connection.end()
}

function updateRents(id, date_required, duration, id_room, callback) {
    connection.connect()
    const sql = "UPDATE aluguer_espaco SET data_hora_requirida=?, duracao=?, id_espaco=? WHERE id_aluguer=? "
    connection.query(sql, [id, date_required, duration, id_room], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Aluguer Editado" })
    })
    connection.end()
}

module.exports = { 
    addRents: addRents,
    removeRents: removeRents,
    updateRents: updateRents
}