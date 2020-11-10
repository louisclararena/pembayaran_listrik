const express = require ("express")
const app = express ()

//library jwt
const jwt = require("jsonwebtoken")

//library md5
const md5 = require("md5")

//call model
const admin = require("../models/index").admin
const penggunaan = require("../models/index").penggunaan
const pelanggan = require("../models/index").pelanggan

app.use(express.urlencoded({extended: true}))

app.post("/admin", async (req,res)=> {
    let parameter = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await admin.findOne({where: parameter})
    if(result === null) {
        //invalid username or password
        res.json({
            message: " invalid username or password"
        })
    }else {
        //login success
        //generate token using jwt
        //jwt->header, payload, secretkey
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1h"
        }

        let payload = {data: result}
        let secretkey = "PdmMoklet"

        let token = jwt.sign(payload, secretkey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
})

app.post('/penggunaan', async (req,res)=> {
    //ambil username
    let parameter = {
        username: req.body.username,
    };
    console.log(parameter);

    //cari data pelanggan berdasarkan username
    pelanggan.findOne({ where: parameter})
    .then((resultPelanggan) => {
        //jika user ditemukan melakukan sesuatu
        if (resultPelanggan) {
            const convertPass = md5(req.body.password)
            //check password
            if (resultPelanggan.password === convertPass) {
                const payload = {
                    id_pelanggan: resultPelanggan.id_pelanggan,
                    username: resultPelanggan.username,
                    nama_pelanggan: resultPelanggan.nama_pelanggan,
    
                };
                const idPelanggan = {
                    id_pelanggan: resultPelanggan.id_pelanggan,
                  };
        
                  // cari data penggunaan berdasarkan id_pelanggan
                  const result = penggunaan.findOne({ where: idPelanggan });
                  let jwtHeader = {
                    algorithm: 'HS256',
                    expiresIn: '1h',
                  };
        
                  let secretKey = 'PdmMoklet';
        
                  let token = jwt.sign(payload, secretKey, jwtHeader);
                  res.json({
                    data: result,
                    token: token,
                  });
                } else {
                  // jika password salah
                  res.json({
                    success: 0,
                    subject: 'Password invalid',
                    message: error.message,
                  });
                }
              } else {
                //   jika user tidak ditemukan
                res.json({
                  success: 0,
                  subject: 'Username or Password salah',
                  message: error.message,
                });
              }
            })
            .catch((error) => {
              // ketika username atau password salah atau user tdak ditemukan
              res.json({
                success: 0,
                subject: 'Username or Password invalid',
                message: error.message,
              });
            });
        });
      
      module.exports = app