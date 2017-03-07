var express = require('express');
var router = express.Router();
var paramlist=[];
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.twig', { params: paramlist});
});

module.exports = router;
