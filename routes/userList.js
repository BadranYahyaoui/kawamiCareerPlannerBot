var express = require('express');
var router = express.Router();

var User  = require('../models/user');





router.get('/', function(req, res, next) {


    User.find(function (err, user_list) {
        if (!err) {
            res.json(user_list);
        } else {
            res.json({});
        }
    });
});

router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function (err, user_data) {
        if (!err) {
            console.log('user Found');
            res.send(user_data);

        } else {
            console.log('user NOt found');
            res.send('{}');
        }
    });
});
router.post('/', function(req, res, next) {

    console.log(req.body);

    var newUser = new User();
    newUser.local.email = req.body.email;
    newUser.local.password = newUser.generateHash(req.body.password);
    // console.log(req.body.password);
    //     console.log(req.body.email);
    //     console.log(newUser.local.email);

    newUser.save(function (err,createdTodoObject) {
        if (!err) {
             res.send(createdTodoObject);
        } else {

             res.send(err);
        }
    });

});

router.put('/', function(req, res, next) {

    id=req.body._id;
    console.log(id);
    console.log(req.body);

    User.findById(id, function (err, user_data) {
        if (!err) {
                console.log("working on apdate")
            console.log(user_data);
            user_data.local.email=req.body.local.email;
            user_data.local.password=user_data.generateHash(req.body.local.password);

            user_data.save(function (err) {
                if (!err) {
                    res.send("updated");
                } else {

                    res.send('cannot update');
                }

            });


        } else {
            return next(new Error('Could not load article'));


        }
    });


});
// router.delete('/:id', function(req, res, next) {
//
//     id=req.params.id;
//
//     User.find({_id:id}).remove().exec().next();
//
// });

router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function (err, user_data) {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        var response = {
            message: "Todo successfully deleted",
            id: user_data._id
        };
        res.send(response);
    });
});

router.post('/users/addinterests/:id', function(req, res, next) {

    User.findById(req.params.id, function (err, user_data) {
        if (!err) {
            console.log(" User found working on apdate");
            console.log(user_data);
            if (req.body.interests !=undefined){

                user_data.interests=req.body.interests;

                user_data.save(function (err) {
                    if (!err) {
                        res.send("updated");
                    } else {

                        res.send('cannot update');
                    }

                });

            }


        } else {
            return res.send('Could not load user');


        }
    });
});

router.get('/users/stats', function(req, res, next) {


    User.find(function (err, user_list) {
        if (!err) {
         //   res.json(user_list);
            var stat={
                "twitter":0,
                "facebook":0,
                "google":0,
                "total":0,
                "unverified":0
            };
            stat.total=user_list.length;
            user_list.forEach(function (user) {
                if(user.twitter.username!=undefined){
                    stat.twitter++;
                   // console.log(user.twitter)

                }
                if(user.facebook.email!=undefined){
                    stat.facebook++;

                }
                if(user.google.name!=undefined){
                    stat.google++;
                }
                if((user.google.name==undefined)&&(user.twitter.username==undefined)&&(user.facebook.email==undefined)){
                    stat.unverified++;
                }

            });

            res.json(stat);

        } else {
            console.log(error)
            res.json({});
        }
    });
});

module.exports = router;