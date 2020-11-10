const express = require("express")
const app = express ()

//call model for pelanggan
const pelanggan = require("../models/index").pelanggan

//library md5
const md5 = require("md5")

//middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

//autorization
const verify = require("./verify")

//endpoint get
app.get("/", verify, async(req,res) => {
    pelanggan.findAll({
        include: ["tarif"]
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
app.post("/",async(req, res) => {
//tampung data request yang akan digunakan
let data = {
    username: req.body.username,
    password: md5(req.body.password),
    nomor_kwh: req.body.nomor_kwh,
    nama_pelanggan: req.body.nama_pelanggan,
    alamat: req.body.alamat,
    id_tarif: req.body.id_tarif

}

//execute insert data
pelanggan.create(data)
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
app.put("/",verify, async(req,res)=> {
    //tampung data request yang akan diubah
    let data = {
    username: req.body.username,
    password: req.body.password,
    nomor_kwh: req.body.nomor_kwh,
    nama_pelanggan: req.body.nama_pelanggan,
    alamat: req.body.alamat,
    id_tarif: req.body.id_tarif
    }
// key yang menunjukkan data yang akan diubah
let param = {
    id_pelanggan: req.body.id_pelanggan
}

//execute update data
pelanggan.update(data,{where : param})
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
app.delete("/:id_pelanggan", verify,async(req, res) => {
    let id_pelanggan = req.params.id_pelanggan
    let parameter = {
        id_pelanggan
    }
    //execute delete data
    pelanggan.destroy({where : parameter})
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
