const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can only upload image files!"), false);
    }
    cb(null, true);
};

const upload = multer({storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end("Get router is not supported on this url");
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put rotue is not supported on this url");
})
.post(upload.single('imageFile'), (req, res, next) => {
    console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("Delete route is not supported on this url");
});

module.exports = uploadRouter;
