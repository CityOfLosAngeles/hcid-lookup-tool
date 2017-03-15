
import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import db from './models';
const router = express.Router();

const PORT = process.env.PORT || 6060;


// ************** MULTER CONFIG ****************** // 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}-${Date.now()}`)
    }
});

const upload = multer({storage: storage}); // PASS THE CONFIG INTO MULTER
// *************************************************// 

router.get('/', (req, res) => {
    checkFolder('uploads');
    checkFolder('temp-data');
    res.sendFile(path.join(__dirname, './public/index.html'))
});

router.post('/upload', upload.single('file'), (req, res) => {
    watchFolder();
	res.status(301).redirect('/');
});

router.get('/test', (req,res) => {
    require('./controllers/bims_controller.js').readData(app);
    res.status(301).redirect('/');
});

let app = express();

app.use(router);
app.use(function(req, res, next){
    res.setTimeout(480000, function(){ // 4 minute timeout adjust for larger uploads
        console.log('Request has timed out.');
            res.send(408);
        });

    next();
});

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});


// Functions Section

let checkFolder = (folderName) => {
    if (!fs.existsSync(`./${folderName}`)){
        fs.mkdirSync(`./${folderName}`);
    }
}

let watchFolder = () => {
    fs.watch('./uploads', (eventType, filename) => {
        if (filename){
            console.log(eventType, filename);
            copyToTemp(filename);
        }
        if(!filename){
            return
        }
    });
}

let copyToTemp = (src) => {
    let readStream = fs.createReadStream(`./uploads/${src}`);

    readStream.once('error', (err) => {
        console.log(err);
    });

    readStream.once('end', () => {
        console.log('done copying');
    });
    
    readStream.pipe(fs.createWriteStream(`./temp-data/${src}`));
}
