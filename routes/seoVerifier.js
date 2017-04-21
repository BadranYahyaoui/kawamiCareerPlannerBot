


var express = require('express');
var router = express.Router();

var fs =require('fs');

var results={
    'robotfile':null,
    'sitemap':null,
};








router.get('/', function(req, res, next) {
    try {
        if(fs.lstatSync('./public/robot.txt').isFile())
       results.robotfile="exist"
    } catch(err) {

            results.robotfile="not existing"

    }
    try {
        if(fs.lstatSync('./public/sitemap.xml').isFile())
            results.sitemap="exist"
    } catch(err) {
           results.sitemap="not existing"

    }



    setTimeout(function(){
       res.json(results);
        console.log(results);
    }, 800);

});


module.exports = router;



