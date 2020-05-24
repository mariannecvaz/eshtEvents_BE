const dbConfig = require("../../database/dbConfig.json")
const mySql = require("mysql")
var connection = mySql.createConnection(dbConfig)

function addWorkshops(description, n_vacancies, date_hour, price, id_local, callback) {
    connection.connect()

    const sql = "INSERT INTO inscricao_workshop (descritivo, nr_vagas, data_hora, preco, id_localizacao) VALUES (?,?,?,?,?)"
    connection.query(sql, [description, n_vacancies, date_hour, price, id_local], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Workshop Adicionado" })
    })

    connection.end()
}
function removeWorkshops(id, callback) {
    connection.connect()

    const sql = "DELETE FROM inscricao_workshop WHERE id_workshop = ?"
    connection.query(sql, [id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Workshop Removido" })
    })

    connection.end()
}
function updateWorkshops(id, description, n_vacancies, date_hour, price, id_local, callback) {
    connection.connect()
    const sql = "UPDATE inscricao_workshop SET descritivo=?, nr_vagas=?, data_hora=?, preco=?, id_localizacao=? WHERE id_workshop=? "
    connection.query(sql, [description, n_vacancies, date_hour, price, id_local,id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Workshop Editado" })
    })
    connection.end()
}
module.exports = { addWorkshops:addWorkshops, removeWorkshops:removeWorkshops, updateWorkshops:updateWorkshops }