// const dbConfig = require("../../database/dbConfig.json")
const jsonwebtoken = require('jsonwebtoken')
const config = require("../../config.json")
const bcrypt = require("bcrypt")
const mySql = require("mysql")
var connection = mySql.createConnection({ host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database })
// var connection = mySql.createConnection(dbConfig)

//login com email e password
function login(pass, email, callback) {
    connect()

    const sql = "SELECT email_ipp,password FROM utilizador WHERE email_ipp=?"
    connection.query(sql, [email], function (error, rows, fields) {
        if (!error) {
            //compara a password inserida com a password retornada pelo email 
            bcrypt.compare(pass, rows[0].password, function (error, results) {
                if (error) {
                    callback(error)
                }
                if (results) {
                    //Se nao der err, ele cria um token que expira passado 2hrs
                    let token = jsonwebtoken.sign({ email: email }, config.secret, { expiresIn: '2h' })
                    callback(null, { sucess: true, message: "Sessão iniciada", token: token })
                }
            })
        }
        else {
            callback(error)
        }
    })
    end()
}

//LogOut, e adiciona o token criado para o iniciar sessao numa tabela
function logout(token, callback) {
    connect()

    const sql = "INSERT INTO token_bloqueado (token) VALUES (?)"
    connection.query(sql, [token], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Sessão Terminada com Sucesso" })
    })

    end()
}

//Funcao de Criar Conta-- por default o tipo de utilizador é sempre Cliente
function addUser(name, pass, img, data, telemovel, idE, email, callback) {
    connect()

    const sql = "INSERT INTO utilizador (id_tipoUser,nome,password,foto_perfil,data_nascimento,telemovel,id_ipp,email_ipp) VALUES (?,?,?,?,?,?,?,?)"
    connection.query(sql, [2, name, pass, img, data, telemovel, idE, email], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Utilizador Adicionado" })
    })

    end()
}

//remover utilizador pelo ID
function removeUser(id, callback) {
    connect()

    const sql = "DELETE FROM utilizador WHERE id_utilizador = ?"
    connection.query(sql, [id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Utilizador Removido" })
    })

    end()
}

//editar utilizador: mudar pass e img 
function updateUser(pass, img, id, callback) {
    connect()

    const sql = "UPDATE utilizador SET password=?,foto_perfil=? WHERE id_utilizador = ? "
    connection.query(sql, [pass, img, id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Utilizador Editado" })
    })
    end()
}
//Getssss
function getUser(callback) {
    connect()

    const sql = "SELECT id_tipoUser,nome,password,foto_perfil,data_nascimento,telemovel,email_ipp FROM utilizador"
    connection.query(sql, function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: results })
    })
    end()
}
function getUserID(id, callback) {
    connect()

    const sql = "SELECT id_tipoUser,nome,password,foto_perfil,data_nascimento,telemovel,email_ipp FROM utilizador WHERE id_utilizador = ?"
    connection.query(sql, [id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: results })
    })
    end()
}
module.exports = {
    addUser: addUser,
    removeUser: removeUser,
    updateUser: updateUser,
    getUser: getUser, 
    getUserID: getUserID, 
    login: login,
    logout: logout
}