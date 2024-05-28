import fs from 'fs'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination :  async(req, file, cb) => {

        if(!fs.existsSync('uploads')){
            fs.mkdirSync('uploads')
        }
        cb(null, 'uploads/')

    },

    filename : (req, file, cb) => {
        cb(null, `${file.originalname.split('.pdf').join('')}-${Date.now()}${path.extname(file.originalname)}`)

    }
})

export default multer({storage})