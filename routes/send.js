var express = require('express');
var router = express.Router();

const service = require('../service');


router.post('/send', function(req, res, next) {
  const body = req.body;
  service.send(body, function(err,response){
    if(err){
      res.json({ 
        status : "error",
        error : err
    })
}else{
  res.json({ 
    status : "ok",
    res: response
  })
}

})

});

module.exports = router;