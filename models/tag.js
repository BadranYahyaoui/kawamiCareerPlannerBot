var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tagModel = new Schema({
    title: {
        type: String
    }
});

module.exports= mongoose.model('Tag', tagModel);