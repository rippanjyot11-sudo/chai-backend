import multer from"multer" 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp') // 2nd parameter hai jha mai sari files rkhungi apni vo folder 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
export default upload;