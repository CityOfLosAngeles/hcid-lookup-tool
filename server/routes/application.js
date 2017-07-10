var express = require('express');
var router = express.Router();

  router.get('/', (req, res) => {
    // test sending data to the front end
    res.sendFile(__dirname + "/public/index.html");
  });

  router.get('/search', (req, res) => {
    res.render('search');
  });

  router.get('/upload', (req, res) => {
    res.render('upload');
  });

  router.get('/query', (req, res) => {
    let whereStatement = {};
    if(req.query.street_num){
      whereStatement.street_num = parseInt(req.query.street_num)
    }
    if(req.query.street_name){
      whereStatement.street_name = req.query.street_name.toUpperCase()
    }
    if(req.query.zipcode){
      whereStatement.zipcode = req.query.zipcode
    }
    db.AddressMaster.findAll({
      where: whereStatement,
      include: [{model:db.Bims},{model:db.Hims},{model:db.Scep}, {model:db.Rent}, {model:db.Prop_site_address}]
    }).then((result) => {
      let queryResult = {
        info: result
      };
      res.json(queryResult);
    });
  });

// }

module.exports = router;
