
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
        let name = file.originalname.split('.');
        cb(null, `${name[0]}-${Date.now()}.${name[1]}`);
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


// Test routes (will be removed)
router.get('/bims', (req,res) => {
    require('./controllers/bims_controller.js').readData(app);
    res.status(301).redirect('/');
});

router.get('/hims', (req,res) => {
    require('./controllers/hims_controller.js').readData(app);
    res.status(301).redirect('/');
});

router.get('/prop-site', (req,res) => {
    require('./controllers/prop_site_address_controller.js').readData(app);
    res.status(301).redirect('/');
});

router.get('/prop-unit', (req,res) => {
    require('./controllers/prop_unit_controller.js').readData(app);
    res.status(301).redirect('/');
});

router.get('/rent', (req,res) => {
    require('./controllers/rent_controller.js').readData(app);
    res.status(301).redirect('/');
});

router.get('/scep', (req,res) => {
    require('./controllers/scep_controller.js').readData(app);
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

let copyToTemp = (fileName) => {
    let readStream = fs.createReadStream(`./uploads/${fileName}`);
    let tempName = '';

    if(fileName.includes('bims')){
        tempName = 'bims.csv';
    } else if (fileName.includes('hims')){
        tempName = 'hims.csv';
    } else if (fileName.includes('site')){
        tempName = 'prop_site_address.csv';
    } else if (fileName.includes('unit')){
        tempName = 'prop_unit.csv';
    } else if (fileName.includes('rent')){
        tempName = 'rent.csv';
    } else if (fileName.includes('scep')){
        tempName = 'scep.csv';
    } else {
        return;
    }

    readStream.once('error', (err) => {
        console.log(err);
    });

    readStream.once('end', () => {
        console.log('done copying');
    });
    
    readStream.pipe(fs.createWriteStream(`./temp-data/${tempName}`));
}
