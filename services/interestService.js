var User  = require('../models/user');
module.exports.twitterInterestSaver=function saver(interests,userId){
    return new Promise(function(resolve,reject){
        User.findById(userId, function (err, user_data) {
            if (!err) {
                console.log('user Found');
                user_data.twitter.interests=interests;
                user_data.save(function (err) {
                    if (!err) {
                        resolve("user twitter interests updated succesfully updated");
                    } else {

                        resolve('cannot update user twitter interest ');
                    }

                });
                resolve('unser interst updated ');

            } else {
                console.log('user NOt found');
                reject(err)
            }
        });


    });






};