var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var University = new Schema({

    nom:String,
    tel:String,
    mail:String,
    site:String
   
});
mongoose.model('university',University);


var Vocational = new Schema({

    title:String

});
mongoose.model('vocational',Vocational);
mongoose.connect('mongodb://localhost:27017/studentshelper');


