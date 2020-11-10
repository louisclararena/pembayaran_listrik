const express = require("express")
const app = express ()

//call model for admin
const admin = require("../models/index").admin

//middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

//library md5
const md5 = require("md5")

//endpoint get
app.get("/", async(req,res) => {
    admin.findAll({
        include: ["level"]
})
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
        message: error.message
        })
    })
})

//endpoint post
app.post("/", (req, res) => {
//tampung data request yang akan digunakan
let data = {
    username: req.body.username,
    password: md5(req.body.password),
    nama_admin: req.body.nama_admin,
    id_level: req.body.id_level,
    
}

//execute insert data
admin.create(data)
.then(result => {
    res.json({
        message: "Data has been inserted",
        data: result
    })
})
.catch(error => {
    res.json({
        message: error.message
    })
})
})

//endpoint put
app.put("/", async(req,res)=> {
    //tampung data request yang akan diubah
    let data = {
    username: req.body.username,
    password: req.body.password,
    nama_admin: req.body.nama_admin,
    id_level: req.body.id_level,
    }
// key yang menunjukkan data yang akan diubah
let param = {
    id_admin: req.body.id_admin
}

//execute update data
admin.update(data,{where : param})
.then(result => {
    res.json({
        message: " Data has been updated",
        data: result
    })
})
.catch(error => {
    res.json ({
        message: error.message
    })
})
})


//endpoint delete
app.delete("/:id_admin", async(req, res) => {
    let id_admin = req.params.id_admin
    let parameter = {
        id_admin
    }
    //execute delete data
    admin.destroy({where : parameter})
    .then(result => {
        res.json ({
            message: "Data has been deleted"
        })
    })
    .catch(error => {
        res.json ({
            message: error.message
        })
    })
    })
    

module.exports = app
