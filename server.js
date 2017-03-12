
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
     destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

const upload = multer({storage:storage})


router.get('/', (req, res)=>{
	 res.sendFile(path.join(__dirname, `./public/index.html`))
})

router.post('/upload', upload.single('file'), (req, res) => {
	res.status(200).end();
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



const PORT = process.env.PORT || 6060;
app.listen(PORT, () => console.log('Server listening on port ' + PORT));

