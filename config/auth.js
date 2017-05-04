// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '799510400203360', // your App ID
        'clientSecret'    : '32478566e898cdd6f923a81b871822ab', // your App Secret
        'callbackURL'     : 'https://carrerplanner-bot.herokuapp.com/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,email,birthday,education,work,books.reads'

    },

    'twitterAuth' : {
        'consumerKey'        : 'r9ourmJGw565hd9mTgown89US',
        'consumerSecret'     : 'cjKp7ftZWKGd8kMTDh61mS8YRxM2hWbqV5UdV1vjpNKKXou3VO',
        'callbackURL'        : 'https://carrerplanner-bot.herokuapp.com/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '979450598786-3i0id3uhc9q7ip81j4j4b2nlcdq1jnpt.apps.googleusercontent.com',
        'clientSecret'     : 'zdNXdg0DCPFf4wuJT8fFrkQ1',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }

};
