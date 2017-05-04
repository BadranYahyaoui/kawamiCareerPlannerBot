var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var subQuestions = {
    content: String,
    tags: Array
    
};



var quizModel = new Schema({
    category: String,
        type: String,
        title: String,
        description: String,
        selectedTimes: {type: Number, default:1},
        satisfactionRate: {type: Number, default:100},  
        questions: [subQuestions]
    
});

module.exports= mongoose.model('Quiz', quizModel);