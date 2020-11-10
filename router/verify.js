const jwt = require("jsonwebtoken")

// mengambil data token
verify = (req, res, next) => {
    let headers = req.headers.authorization
    let token = null

    if(headers != null) {
        token = headers.split(" ")[1]
        // header = Bearer kode_token
        // split -> untuk mengkonversi string menjadi array
        // array = ["Beare", "kode_token"]
    }

    if(token == null) {
        res.json({
            message: "Unauthorization / tidak berhasil"
        })
    } else {
        let jwtHeader = {
            algorithm: "HS256"
        }

        let secretKey = "PdmMoklet"

        jwt.verify(token, secretKey, jwtHeader, err => {
            if(err) {
                res.json({
                    message: "Invalid or expired token"
                })
            } else {
                next()
            }
        })
    }
}

module.exports = verify