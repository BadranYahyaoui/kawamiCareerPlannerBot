



var express = require('express');
var router = express.Router();

var fs =require('fs');








router.get('/', function(req, res, next) {
    var results={
        'robotfile':null,
        'sitemap':null,
    };

    try {
        if(fs.lstatSync('./public/robot.txt').isFile())
            results.robotfile="exists"
    } catch(err) {


        var fileContent = "User-agent: *";
        fileContent=fileContent+" \n ";
        fileContent=fileContent+" Disallow: /style/*> ";
        fileContent=fileContent+" \n ";
        fileContent=fileContent+" Disallow: /js/*";
        fileContent=fileContent+" Allow: /indexApp.html";
        fileContent=fileContent+" \n ";
        fileContent=fileContent+" Sitemap:carrerplanner-bot.herokuapp.com";
        fileContent=fileContent+" \n ";

        console.log(fileContent);


        var filepath = "./public/robot.txt";

        fs.writeFile(filepath, fileContent, function (err)  {
            if (err) throw err;

            results.robotfile="file Created successfuly"
        });








    }
    try {
        if(fs.lstatSync('./public/sitemap.xml').isFile())
            results.sitemap="exist"
    } catch(err) {
        var fileContent = "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">"
        fileContent=fileContent+" \n ";
        fileContent=fileContent+" <url> ";
        fileContent=fileContent+" <loc>carrerplanner-bot.herokuapp.com</loc>";
        fileContent=fileContent+" \n ";
        fileContent=fileContent+" <lastmod>2017-03-02T11:42:50+00:00</lastmod> ";
        fileContent=fileContent+" \n ";
        fileContent=fileContent+" </url>  ";
        fileContent=fileContent+" \n ";
        fileContent=fileContent+" </urlset>";
        console.log(fileContent);


        var filepath = "./public/sitemap.xml";

        fs.writeFile(filepath, fileContent, function (err)  {
            if (err) throw err;

            results.sitemap="file Created successfuly"
        });




    }


    setTimeout(function(){
        res.json(results);
        console.log(results);
    }, 800);


});





module.exports = router;



