
var Twitter = require('twitter');
var fs = require('fs');
var request = require('request');
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


        function descriptionlister() {
            return new Promise(function (resolve, reject) {
                client.get('friends/list', {include_user_entities: false}, function (error, users, response) {


                    descpitionsTab = [];
                    tabUsers = users.users;

                    for (var i = 0, len = tabUsers.length; i < len; i++) {


                        if (tabUsers[i].verified == true) {
                            //  console.log(tabUsers[i].description);
                            descpitionsTab.push(tabUsers[i].description);


                            // this.descpitionsTab.push(tabUsers[i].description);
                        }

                    }
                    resolve(descpitionsTab);

                });

            });

        }

        function DescriptionsTOinterests(myArray) {
            return new Promise(function(resolve, reject)
            {


                function inputTranslator(TranslatedText) {
                    return new Promise(function (resolve, reject) {
                        translate(TranslatedText, {to: 'en'}).then(function (res) {
                            resolve(res.text);

                        }).catch(function (err) {

                            resolve(TranslatedText);

                        });
                    });
                }

                function topicDetecter(text) {
                    return new Promise(function (resolve, reject) {
                        var headers = {
                            'User-Agent': 'Super Agent/0.0.1',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        };
// Configure the request
                        var options = {
                            url: 'http://apidemo.theysay.io/api/v1/topic',
                            method: 'POST',
                            headers: headers,
                            form: {"text": text}
                        };
// Start the request
                        //console.log(text);
                        if(text.length>10){

                            request(options, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    apiResponse = JSON.parse(body);

                                    if (apiResponse['scores'] != undefined) {

                                        if(apiResponse['scores'][0]!=undefined){

                                            resolve(apiResponse['scores'][0].label);
                                        }
                                        else{
                                            resolve('null');
                                        }

                                    }
                                    else {
                                        resolve('null');
                                    }
                                }
                                else {
                                    resolve('null');
                                }
                            });
                        }
                        else{
                            resolve('null');
                        }
                    });
                }

                function translateAndDetect(text) {
                    return new Promise(function (resolve, reject) {
                        inputTranslator(text).then(function (result) {
                            topicDetecter(result).then(function (results) {
                                resolve(results);
                            });
                        })
                    });
                }

                var actions = myArray.map(translateAndDetect);
                var resultsArray = Promise.all(actions);

                resolve(resultsArray);
            })
                ;
        }

        function arrayOfInterests(tab){
            return new Promise(function (resolve,reject) {
                var tab2=[];
                DescriptionsTOinterests(tab).then(function (results) {

                    for(var i=0;i<results.length;i++){
                        if (['null', 'TERRORISM', 'SOCIAL_MEDIA'].indexOf(results[i]) < 0) {
                            tab2.push(results[i]);
                        }




                    }
                    resolve(tab2);
                });
            });
        }

        descriptionlister().then(function (descriptionsList) {
            console.log('description list :\n '+JSON.stringify(descriptionsList));
            arrayOfInterests(descriptionsList).then(function (result) {
                //console.log("resoving");
                // console.log('topics :\n'+JSON.stringify(result));
                resolve(result)
            })
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
