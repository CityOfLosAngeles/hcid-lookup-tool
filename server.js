const Busboy = require('busboy');
const express = require('express');
const csv = require('fast-csv');
const router = express.Router();
const parser = csv();
const path = require('path');

router.get('/', (req, res)=>{
	 res.sendFile(path.join(__dirname, `./public/index.html`))
})

router.post('/upload', (req, res) => {
	console.info('start post', req.headers);
	let busboy = new Busboy({
		headers: req.headers
	});
	let result = [];
	busboy.on('file', (fieldname, file) => {
		console.info('busboy on file');
		file.on('readable', () => {
			console.info('busboy on file, on readable');
			let data;
			while ((data = file.read()) !== null) {
				parser.write(data);
			}
		})
		.on('end', () => {
			console.info('busboy on file, on end');
			parser.end();
		});
	});

	parser.on('readable', () => {
		console.info('parser on file, on readable');
		let data;
		while ((data = parser.read()) !== null) {
			//console.log(data);
			result.push(data);
		}
	})
	.on('end', () => {
		console.log('done:', result);
		res.json(result);
	});

	req.pipe(busboy);
});

let app = express();

app.use(router);

const PORT = process.env.PORT || 6060;
app.listen(PORT, () => console.log('Server listening on port ' + PORT));