var mongoose=require('mongoose');
var Vocational=mongoose.model('vocational');

var express = require('express');
var router = express.Router();
const request = require('request');
var cheerio = require('cheerio');
var fs = require('fs')







/* GET users listing. */
router.get('/', function(req, res) {


Vocational.find(function(err, vocational) {
       console.log(vocational);
 res.json(vocational);
 
 });
 });

// router.get('/:id',function(req,res){

// var id=req.params.id;
// Vocational.findById(id).exec(function(err,vocational){
// 	if(err)
// 		res.status(400).send(err);
// 	if(!vocational)
// 		res.status(404).send();
// 	else
// 		res.json(vocational);
// });


// });


router.get('/add', function (req, res) {

       var o = [

	{
        "url": "http://www.etudionet.com/fr/etude/guide_centres.php"
    }
	
];
var tav = Object.values(o);
var vocational=new Vocational();
for (i = 0; i < tav.length; i++) {
    console.log(tav[i].url);
    request(tav[i].url, function(err, res, body) {
        if (err) console.log('erro: ' + err);
        var $ = cheerio.load(body);
        var titles = [];
		var a=0;
		$('td tr .linkrub').each(function() {
			a=a+1;
			console.log(Number(a));
       		title = $(this).text().trim();
            console.log('title :'+title);
			var titles=new Vocational({
               "title" : title
            });
            titles.save();
        });	
		
		fs.appendFile('data/vocational.json', JSON.stringify(titles));
//res.send('ok');
    });

}
});
router.delete('/:id', function(req,res) {

var id=req.params.id;
Vocational.findByIdAndRemove(id, function(err,vocational){
	if(err)
		res.send(err);
	else
		res.send();
})
});

router.put('/:id' , function (req, res){

 var vocational= new Vocational(req.body)
   vocational.save(function(err,vocational){
       console.log(vocational);
      res.json(vocational);
  });
});
module.exports = router;
