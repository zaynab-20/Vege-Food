
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads')
    },
    filename: (res, file, cb) =>{
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        const ext = file.mimetype.split('/')[1]
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext)
    }
});
const fileFilter = (req, file, cb) =>{
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    }else {
        cb(new Error('Invalid file type, image only '))
    }
};

const limits = {
    limits: 1024 * 1024 * 10
};

const upload = multer({
    storage,
    fileFilter,
    limits
});

module.exports = upload