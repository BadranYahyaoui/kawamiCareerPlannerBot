
var Twitter = require('twitter');
var fs = require('fs');
//source api link https://github.com/matheuss/google-translate-api

const translate = require('google-translate-api');

module.exports = exports = function(twitter_token_key, twitter_token_secret) {
    return new Promise(function (resolve, reject) {
        console.log(twitter_token_key);
        var client = new Twitter({
            consumer_key: 'r9ourmJGw565hd9mTgown89US',
            consumer_secret: 'cjKp7ftZWKGd8kMTDh61mS8YRxM2hWbqV5UdV1vjpNKKXou3VO',
            access_token_key: twitter_token_key,
            access_token_secret: twitter_token_secret
        });

        var datum = require('datumbox').factory("85ae19942d43d13ad0a8caba062ac443");

        function descriptionlister() {
            return new Promise(function (resolve, reject) {
                client.get('friends/list', {include_user_entities: false}, function (error, users, response) {


                    descpitionsTab = [];
                    tabUsers = users.users;

                    for (var i = 0, len = tabUsers.length; i < len; i++) {


                        if (tabUsers[i].verified == true) {

                            descpitionsTab.push(tabUsers[i].description);


                            // this.descpitionsTab.push(tabUsers[i].description);
                        }

                    }
                    resolve(descpitionsTab);

                });

            });

        }

        function descriptionTranslaterAndCorrecter(description) {
            return new Promise(function (resolve, reject) {

                translate(description, {to: 'en'}).then(function (res) {
                    //    console.log(res);
                    if (res.from.language.iso == 'en') {
                        result = res.from.text.value.replace(/[\[\]']+/g, '');
                        resolve(result);
                    }

                    else {

                        resolve(res.text);
                    }


                }).catch(function (err) {
                    // console.error(err);
                    console.error('erreur with google translate api mochkla mil api // thsi api is trying to fail some results ');
                    resolve('');
                    // reject(err);
                });


            });

        };
        function descriptionsFetcher(descriptionlist) {
            //console.log(descriptionlist);

            return new Promise(function (resolve, reject) {
                var actions = descriptionlist.map(descriptionTranslaterAndCorrecter);
                var results = Promise.all(actions);

                results.then(function (data) {

                        resolve(data);
                        //   console.log(data);
                    }
                );

            });
        }

// descriptionlister().then(function (descriptionlist) {
//
//     descriptionsFetcher(descriptionlist).then(function (translatedDesClist) {
//         console.log(translatedDesClist);
//     });
//
// });


        function topicClassificator(data) {
            return new Promise(function (resolve, reject) {

                datum.topicClassification(data, function (err, data) {
                    if (err)
                        resolve(null);


                    resolve(data);

                    // Remarks here.
                });

            });
        }

        function DescriptionsTopics() {
            return new Promise(function (resolve, reject) {

                descriptionlister().then(function (descriptionlist) {

                    descriptionsFetcher(descriptionlist).then(function (translatedDesClist) {
                       // console.log(translatedDesClist);
                        var actions = translatedDesClist.map(topicClassificator);
                        var results = Promise.all(actions);
                        resolve(results);
                        //console.log(results);
                    });

                });


            });
        }

        function twitterUsersInrests() {
            return new Promise(function (resolve, reject) {
                DescriptionsTopics().then(function (results) {
                    resolve(results);
                });

            });
        }
        twitterUsersInrests().then(function (res) {
            // console.log(res);
            resolve(res)
        });




    });

};



















// jawha behi
// client.get('statuses/user_timeline', {count: 20 }, function(error, tweets, response) {
//      if(error) throw error;
//     //console.log( tweets);
//
//
//     fs.writeFile("/tmp_files/test.txt",JSON.stringify(tweets,null,4), function(err) {
//         if(err) {
//             return console.log(err);
//         }
//
//         console.log("The file was saved!");
//     });
//
// });
/* workinng jawha behi
 client.post('statuses/update', {status: 'i startded using Kwami Carrer bot planner at '+new Date()},  function(error, tweet,following, response) {
 if(error) throw error;
 //  console.log(tweet);

 });
 */
