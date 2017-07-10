var express = require('express');
var router  = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let name = file.originalname.split('.');
        cb(null, `${name[0]}-${Date.now()}.${name[1]}`);
    }
});

const upload = multer({ storage: storage }); // PASS THE CONFIG INTO MULTER

// ************* CSV Upload ***************** //
router.get('/', (req, res) => {
    checkFolder('uploads');
    checkFolder('temp-data');
    res.redirect('/search');
});

router.post('/upload-data', upload.single('file'), (req, res) => {
    watchFolder();
    res.status(301).redirect('/upload');
});

module.exports = router;
