var express = require('express');
var router = express.Router();
var paramlist=[];


router.get('/', function(req, res, next) {
    res.render('index.twig', { params: paramlist});
});
router.get('/autotentification', function(req, res, next) {
    res.render('autotentification.twig', { params: paramlist});
});

module.exports = router;
