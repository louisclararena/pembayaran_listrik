const express = require("express")
const app = express ()

//call model for pelanggan
const penggunaan = require("../models/index").penggunaan

//middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

//autorization
const verify = require("./verify")

//endpoint get
app.get("/", verify,async(req,res) => {
    penggunaan.findAll({
        include: ["pelanggan"]
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
    id_pelanggan: req.body.id_pelanggan,
    bulan: req.body.bulan,
    tahun: req.body.tahun,
    meter_awal: req.body.meter_awal,
    meter_akhir: req.body.meter_akhir,
}

//execute insert data
penggunaan.create(data)
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
app.put("/", verify,async(req,res)=> {
    //tampung data request yang akan diubah
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }
// key yang menunjukkan data yang akan diubah
let param = {
    id_penggunaan: req.body.id_penggunaan
}

//execute update data
penggunaan.update(data,{where : param})
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
app.delete("/:id_penggunaan", verify,async(req, res) => {
    let id_penggunaan = req.params.id_penggunaan
    let parameter = {
        id_penggunaan
    }
    //execute delete data
    penggunaan.destroy({where : parameter})
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
