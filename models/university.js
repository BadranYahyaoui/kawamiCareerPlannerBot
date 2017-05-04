var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var University = new Schema({

    title:String,
    type:String
});
mongoose.model('university',University);


var Vocational = new Schema({

    Center:String

});
mongoose.model('vocational',Vocational);


