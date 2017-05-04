var User  = require('../models/user');
var Tag=require('../models/tag');
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


function tagAdder(mytag) {

    Tag.findOne({ 'title': mytag }, function (err, tag) {
        if (err) {
            console.log(mytag+'not existing');
            var newTag= new Tag();
            newTag.title=mytag;
            newTag.save(function (err,createdTodoObject) {
                if (!err) {
                    console.log('tag saved')
                } else {

                    res.send('cannot save tag');
                }
            });
        }
        else
        {
            if(tag==null){
                console.log(mytag+'   not existing');
                var newTag= new Tag();
                newTag.title=mytag;
                newTag.save(function (err,createdTag) {
                    if (!err) {
                        console.log('tag saved');
                        console.log(createdTag);

                    } else {

                        console.log('cannot save tag');
                    }
                });
            }
            else {
                console.log(mytag+" exists");
                // console.log(tag) ;

            }

        }

    });

}


module.exports.tagsSaver=function saver(tabTags){

    for(var i=0;i<tabTags.length;i++){
        tagAdder(tabTags[i]);

    }

};
