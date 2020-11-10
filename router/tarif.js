const express = require("express")
const app = express ()

//call model for tarif
const tarif = require("../models/index").tarif

//middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

//autorization
const verify = require("./verify")

//endpoint get
app.get("/", verify,async(req,res) => {
    tarif.findAll()
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
app.post("/", async(req, res) => {
//tampung data request yang akan digunakan
let data = {
    daya: req.body.daya,
    tarifperkwh: req.body.tarifperkwh
}

//execute insert data
tarif.create(data)
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
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }
// key yang menunjukkan data yang akan diubah
let param = {
    id_tarif: req.body.id_tarif
}

//execute update data
tarif.update(data,{where : param})
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
app.delete("/:id_tarif", verify,async(req, res) => {
    let id_tarif = req.params.id_tarif
    let parameter = {
        id_tarif
    }
    //execute delete data
    tarif.destroy({where : parameter})
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
