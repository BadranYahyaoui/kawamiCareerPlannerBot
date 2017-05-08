var mongoose=require('mongoose');
var Universities=mongoose.model('university');

var express = require('express');
var router = express.Router();
const request = require('request');
var cheerio = require('cheerio');
var fs = require('fs')







/* GET users listing. */
router.get('/', function(req, res) {
Universities.find(function(err, university) {
       console.log(university);
 res.json(university);

 
 });
 });



router.get('/add', function (req, res) {

    var o = [
   
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=1"
    },
  {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=2"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=5"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=7"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=9"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=11"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=13"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=14"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=12"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=10"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=8"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=6"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=4"
    },
    {
        "url": "http://www.annuaire.rnu.tn/universite.php?iduniv=3"
    }
 
];
var tav = Object.values(o);

for (i = 0; i < tav.length; i++) {
    console.log(tav[i].url);
    request(tav[i].url, function(err, res, body) {
        if (err) console.log('erro: ' + err);
        var $ = cheerio.load(body);
        
    var universiter = [];
    var titles = [];
    var a=0;
    var tels =[];
    var tel ; 
    var webmail =[];
    var website =[];
    $('td tr .titre').each(function() {
      a=a+1;
      console.log(Number(a));
          title = $(this).text().trim();
            console.log('title :'+title);
      
      titles.push({
               "title" : title
            });
        });
    /*******************************/
    $('td tr .texte').each(function(i,elm) {
            tel = $(this).find('.nombre').text().trim();
      
      console.log(tel.substring(0,10));
      tels.push({
               "tel" : tel
            });
    });
    $('td tr .texte').each(function() {
            tel = $(this).find('.ajout').text().trim();
      x = tel.substring(0,tel.lastIndexOf('www'))  ;
      y = tel.substring(tel.lastIndexOf('www'),tel.length);
      
      webmail.push({
               "mail" : x
      });
      website.push({
        "site" : y
      })
      console.log(website);
    });
    console.log("**************************************************************");


    //var universiter=new Universities();
    for (i = 0; i < tels.length-1; i++) {
      
      console.log('titre :'+titles[i].title);
      console.log('tel :'+tels[i].tel);
      console.log('mail :'+webmail[i].mail);
      console.log('site :'+website[i].site);
      //universiter.push({
        var universiter=new Universities({
                "nom": titles[i].title,
        "tel" : tels[i].tel,
        "mail": webmail[i].mail,
        "site": website[i].site
      });
       universiter.save();
    }
    
    
    fs.appendFile('data/universite.json', JSON.stringify(universiter));
   // res.send('ok');
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

