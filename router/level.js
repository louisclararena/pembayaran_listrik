const express = require("express")
const app = express()

// call model of level
const level = require("../models/index").level

// middleware for allow the request from body body
app.use(express.urlencoded({extended:true}))

//autorization
const verify = require("./verify")


app.get("/", verify,async(req, res) => {
    level.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/",async(req, res) => {
    // tampung data request yg akan digunakan
    let data = {
        nama_level: req.body.nama_level
    }

    // execute insert data
    level.create(data)
    .then(result => {
        res.json({
            message: "Data has been inserted",
            data: result
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })
})

app.put("/", verify,async(req, res) => {
    // tampung data yang akan di ubah
    let data = {
        nama_level: req.body.nama_level
    }

    // key yg menunjukkan data yg akan di ubah
    let param = {
        id_level: req.body.id_level
    }

    // execute update data
    level.update(data,{where:param})
    .then(result => {
        res.json({
            message: "Data has been updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_level",verify, async(req, res) => {
    let id_level = req.params.id_level
    let parameter = {
        id_level: id_level
    }

    // execute delete data
    level.destroy({where:parameter})
    .then(result => {
        res.json({
            message: "Data has been destroyed",
            data: result
        })
    })
})

module.exports = app