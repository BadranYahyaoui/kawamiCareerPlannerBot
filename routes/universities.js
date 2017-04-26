var mongoose=require('mongoose');
var Universities=mongoose.model('university');

var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs')

//var universities = require('../data/university');






/* GET users listing. */
router.get('/', function(req, res) {


Universities.find(function(err, university) {
       console.log(university);
 res.json(university);
 //res.render('university.twig', {university: university});

 
 });
 });

router.get('/:id',function(req,res){

var id=req.params.id;
Universities.findById(id).exec(function(err,university){
	if(err)
		res.status(400).send(err);
	if(!university)
		res.status(404).send();
	else
		res.json(university);
});


});



router.post('/add', function (req, res,next) {
 // var university= new Universities(req.body)
 //   university.save(function(err,university){
 //       console.log(university);
 //      res.json(university);
 //          // res.redirect('form');
 //   });
     var o = [
   
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=1"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=2"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=3"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=4"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=5"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=6"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=7"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=8"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=9"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=10"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=11"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=12"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=13"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=14"
    }
  
];
var tav = Object.values(o);

for (i = 0; i < tav.length; i++) {
    console.log(tav[i].url);
    request(tav[i].url, function(err, res, body) {
        if (err) console.log('erro: ' + err);
        var $ = cheerio.load(body);
        var titles = [];
    var a=0;
    $('td tr .titre').each(function() {
      a=a+1;
      console.log(Number(a));
          title = $(this).text().trim();
            console.log('title :'+title);
      titles.push({
               "title" : title
            });
      university.save();
        }); 
    
    fs.appendFile('data/universite.json', JSON.stringify(titles));
res.redirect('http://localhost:7000');
    });

    }  















});
router.delete('/:id', function(req,res) {

var id=req.params.id;
Universities.findByIdAndRemove(id, function(err,university){
	if(err)
		res.send(err);
	else
		res.send();
})
});
// router.get('/:id', function (req, res, next) {
//     Universities.findById({ _id: req.params.id }, function (err, doc) {   
// return res.json(Universities);
//     })
// });

router.post('/edit/:id', function (req, res, next) {


    Universities.findById({ _id: req.params.id }, function (err, doc) {
        if (err)
            console.log(err);

        doc.title = req.body.universit;
        
        doc.save(function (err, todo) {
            if (err) {
                res.status(500).send(err)
            }
           // res.redirect('/universities/list')
           res.json(Universities);
        });

    })
});
router.put('/:id' , function (req, res){
	// Universities[{_id:req.params.id}]= req.body;
	// Universities.push(function(err,university){
 //       console.log(university);
 //      res.json(university);
 var university= new Universities(req.body)
   university.save(function(err,university){
       console.log(university);
      res.json(university);
  });
});
module.exports = router;
