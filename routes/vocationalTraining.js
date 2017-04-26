var mongoose=require('mongoose');
var Vocational=mongoose.model('vocational');

var express = require('express');
var router = express.Router();

//var universities = require('../data/university');






/* GET users listing. */
router.get('/', function(req, res) {


Vocational.find(function(err, vocational) {
       console.log(vocational);
 res.json(vocational);
 //res.render('university.twig', {university: university});

 
 });
 });

router.get('/:id',function(req,res){

var id=req.params.id;
Vocational.findById(id).exec(function(err,vocational){
	if(err)
		res.status(400).send(err);
	if(!vocational)
		res.status(404).send();
	else
		res.json(vocational);
});


});


router.post('/', function (req, res,next) {
 var vocational= new Vocational(req.body)
   vocational.save(function(err,vocational){
       console.log(vocational);
      res.json(vocational);
          // res.redirect('form');
   });
       
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
// router.get('/:id', function (req, res, next) {
//     Universities.findById({ _id: req.params.id }, function (err, doc) {   
// return res.json(Universities);
//     })
// });

// router.post('/edit/:id', function (req, res, next) {


//     Vocational.findById({ _id: req.params.id }, function (err, doc) {
//         if (err)
//             console.log(err);

//         doc.title = req.body.universit;
        
//         doc.save(function (err, todo) {
//             if (err) {
//                 res.status(500).send(err)
//             }
//            // res.redirect('/universities/list')
//            res.json(Universities);
//         });

//     })
// });
router.put('/:id' , function (req, res){
	// Universities[{_id:req.params.id}]= req.body;
	// Universities.push(function(err,university){
 //       console.log(university);
 //      res.json(university);
 var vocational= new Vocational(req.body)
   vocational.save(function(err,vocational){
       console.log(vocational);
      res.json(vocational);
  });
});
module.exports = router;
