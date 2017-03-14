
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const db = require('./models');

const PORT = process.env.PORT || 6060;
const app = express();

app.use(router);

// ************** MULTER CONFIG ****************** // 
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
         cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}-${Date.now()}`)
     }
})

const upload = multer({storage: storage}); // PASS THE CONFIG INTO MULTER
// *************************************************// 

router.get('/', (req, res) => {
	 res.sendFile(path.join(__dirname, './public/index.html'))
})

router.post('/upload', upload.single('file'), (req, res) => {
    watchFolder();
	res.status(200).redirect('/');
});

app.use((req, res, next) => {
    res.setTimeout(480000, () => { // 4 minute timeout adjust for larger uploads
        console.log('Request has timed out.');
            res.send(408);
        });
    next();
});


watchFolder = () => {
    fs.watch('./uploads', (eventType, filename) => {
        if (filename){
            console.log(eventType, filename);
            copyToTemp(filename);
        }
        if (!filename){
            return;
        }
    });
}

copyToTemp = (src) => {
    let readStream = fs.createReadStream(`./uploads/${src}`);

    readStream.once('error', (err) => {
        console.log(err);
    });

    readStream.once('end', () => {
        console.log('done copying');
    });
    
    readStream.pipe(fs.createWriteStream('./temp-data/${src}'));
}

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});