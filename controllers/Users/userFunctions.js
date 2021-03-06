const jsonwebtoken = require('jsonwebtoken')
const config = require("../../config.json")
const bcrypt = require("bcrypt")
let connection = require('../../database/dbConfig.js')

//login com email e password
function login(pass, email, callback) {
    const sql = "SELECT id_utilizador,utilizador.id_tipoUser, utilizador.nome, utilizador.email_ipp, utilizador.password, utilizador.foto_perfil, data_nascimento, utilizador.telemovel, institucao.nome as school FROM utilizador,institucao WHERE email_ipp = ? && utilizador.id_ipp = institucao.id_ipp;"
    connection.query(sql, [email], function (error, rows, fields) {
        if (!error) {
            //compara a password inserida com a password retornada pelo email 
            bcrypt.compare(pass, rows[0].password, function (error, results) {
                if (error) {
                    callback(error)
                }
                if (results) {
                    //Se nao der err, ele cria um token que expira passado 2hrs
                    let token = jsonwebtoken.sign({ email: email }, config.secret, { expiresIn: '24h' })
                    callback(null, { user: rows, token: token })
                }
            })
        }
        else {
            callback(error)
        }
    })
}

//LogOut, e adiciona o token criado para o iniciar sessao numa tabela
function logout(token, callback) {
    const sql = "INSERT INTO token_bloqueado (token) VALUES (?)"
    connection.query(sql, [token], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Sessão Terminada com Sucesso" })
    })
}

//Funcao de Criar Conta-- por default o tipo de utilizador é sempre Cliente
function addUser(name, pass, img, data, telemovel, idE, email, callback) {
    const sql = "INSERT INTO utilizador (id_tipoUser,nome,password,foto_perfil,data_nascimento,telemovel,id_ipp,email_ipp) VALUES (?,?,?,?,?,?,?,?)"
    connection.query(sql, [2, name, pass, img, data, telemovel, idE, email], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Utilizador Adicionado" })
    })
}

//remover utilizador pelo ID
function removeUser(id, callback) {
    const sql = "DELETE FROM utilizador WHERE id_utilizador = ?"
    connection.query(sql, [id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Utilizador Removido" })
    })
}

//editar utilizador: mudar pass e img 
function updateUser(img, id, callback) {
    const sql = "UPDATE utilizador SET foto_perfil=? WHERE id_utilizador = ? "
    connection.query(sql, [img, id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Utilizador Editado" })
    })
}

//editar utilizador: mudar pass e img 
function updateUserPass(pass, oldPass, id, callback) {
    // const verify = "SELECT password FROM utilizador WHERE id_utilizador= ?;"
    // connection.query(verify, [id], function (error, rows, fields) {
    //     if (!error) {
    //         bcrypt.compare(oldPass, rows[0].password, function (err, res) {
    //             if (err) {
    //                 callback("Password atual incorreta")
    //             }
    //             if (res) {
    const sql = "UPDATE utilizador SET password=? WHERE id_utilizador = ? "
    connection.query(sql, [pass, id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Utilizador Editado" })
        //                 })
        //             }
        //         })
        // }
    })
}

function updateTypeUserA(id, callback) {
    const sql = "UPDATE utilizador SET id_tipoUser=2 WHERE id_utilizador = ? "
    connection.query(sql, [id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Utilizador Editado" })
    })
}
function updateTypeUserC(id, callback) {
    const sql = "UPDATE utilizador SET id_tipoUser=1 WHERE id_utilizador = ? "
    connection.query(sql, [id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: "Utilizador Editado" })
    })
}



//Getssss
function getUser(callback) {
    const sql = "SELECT id_utilizador,tipo_user.descritivo as tipoUser,utilizador.nome,password,foto_perfil,data_nascimento,telemovel,email_ipp,institucao.nome as escola FROM utilizador,institucao, tipo_user WHERE tipo_user.id_tipo_user = utilizador.id_tipoUser AND institucao.id_ipp = utilizador.id_ipp"
    connection.query(sql, function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: results })
    })
}

function getSchool(callback) {
    const sql = "SELECT id_ipp,nome FROM institucao"
    connection.query(sql, function (error, rows, fields) {
        if (error) {
            callback(error)
        }
        else {
            callback(null, { sucess: true, message: rows })
        }
    })
}
function getUserID(id, callback) {
    const sql = "SELECT id_tipoUser,nome,password,foto_perfil,data_nascimento,telemovel,email_ipp FROM utilizador WHERE id_utilizador = ?"
    connection.query(sql, [id], function (error, results) {
        if (error) callback(error)
        callback(null, { sucess: true, message: results })
    })
}

module.exports = {updateTypeUserC:updateTypeUserC, updateTypeUserA: updateTypeUserA, updateUserPass: updateUserPass, addUser: addUser, removeUser: removeUser, updateUser: updateUser, getUser: getUser, getSchool: getSchool, getUserID: getUserID, login: login, logout: logout }
