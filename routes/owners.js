var express = require('express');
var router = express.Router();

var db = require(mainConfig.paths.db.mongodb);





router.get('/owners/:videoId', function(req, res, next){

      //  res.json(req.video);
        var id = req.params.videoId;
        db.video.findOne({_id : db.ObjectId(id)},{_id : 0, title : 0, author : 0, duration : 0, description : 0, path : 0}, function(err, video){
          if(err) return next(err);
          if(!video) return next(new Error('Can not find video'));
          var jsonObject = {"numberOfAnnotation":video.annotations.length,"countView":video.countView,"lastViewDate":video.lastViewDate};

          res.json(jsonObject);


        });
     });

router.get('/ownersstatistic', function(req, res, next){
  db.user.find({},{_id: 0, securityCode: 0, password: 0, active: 0}, function(err, users){
    if(err) return next(err);
    if(!users) return next(new Error('Can not find users'));
    res.json(users);
  });
});



module.exports = router;
