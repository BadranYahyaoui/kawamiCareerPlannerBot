var express = require('express');
var router = express.Router();
var paramlist=[];


router.get('/', function(req, res, next) {
    res.render('index.twig', { params: paramlist});
});

module.exports = router;
