var User  = require('../models/user');
module.exports.jsonFbToBooks=function jsonFbToBooks(myjson){
    return new Promise(function(resolve,reject){
       // console.log(myjson.id);
        if (myjson["books.reads"]!==undefined){
            if (myjson["books.reads"].data){
                var books=[];
                var data=myjson["books.reads"].data;
                for (var i = 0, len = data.length; i < len; i++) {
                    books.push(data[i].data.book.title);
                }
                resolve(books);
            }
            else{
                resolve(null);
                console.log("cannotfind data");
            }

        }
        else{
            resolve(null);
            console.log("cannot find books");
        }

    });
};


module.exports.interestSaver=function saver(interests,userId){
    return new Promise(function(resolve,reject){
        User.findById(userId, function (err, user_data) {
            if (!err) {
                console.log('user Found');
                user_data.facebook.interests=interests;
                user_data.save(function (err) {
                    if (!err) {
                       resolve("user interests updated succesfully updated");
                    } else {

                        resolve('cannot update user fb interest ');
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
