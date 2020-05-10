const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');

app.use(express.static('public'));
app.use('/', router);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// SET STORAGE DESTINATION & FILENAMING
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// SET UPLOAD CONFIG
const upload = multer({ storage: storage });

app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field);
    next(err);
});


// HANDLE FILE UPLOAD
app.post('/single', upload.any('sample'), (req, res) => {
    console.log(req.file);
    console.log(req.params);
    if (req.file) {
        console.log("successfully received");
        res.send({success: "success"});
    }
    return res.redirect('/');
});

app.listen(process.env.port || 3000);
console.log('Running at Port 3000');