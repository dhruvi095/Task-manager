const multer = require('multer')
const path = require('path')

const Storage = multer.diskStorage({
  destination : "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: Storage,limits:{fileSize:2000000}})

module.exports = upload
