var express = require('express');


var routes = function(Quiz){
    var quizRouter = express.Router();

    quizRouter.route('/')
        .post(function(req, res){
            var quiz = new Quiz(req.body);


            quiz.save();
            res.status(201).send(quiz);

        })
        .get(function(req,res){

            var query = {};

            if(req.query.category)
            {
                query.category = req.query.category;
            }
            Quiz.find(query, function(err,quizzes){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(quizzes);
            });
        });
    
    quizRouter.route('/stats')
        .get(function(req,res){
        
            Quiz.aggregate([{$group:{_id:"$category", total:{$sum: "$selectedTimes"}}}], function(err,quizzes){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(quizzes);

            })
            
    
    
    });
    
    

    quizRouter.use('/:quizId', function(req,res,next){
        Quiz.findById(req.params.quizId, function(err,quiz){
            if(err)
                res.status(500).send(err);
            else if(quiz)
            {
                req.quiz = quiz;
                next();
            }
            else
            {
                res.status(404).send('no quiz found');
            }
        });
    });
    quizRouter.route('/:quizId')
        .get(function(req,res){

            res.json(req.quiz);

        })
        .put(function(req,res){
            req.quiz.title = req.body.title;
            req.quiz.category = req.body.category;
            req.quiz.description = req.body.description;
            req.quiz.selectedTimes = req.body.selectedTimes;
            req.quiz.satisfactionRate = req.body.satisfactionRate;
            req.quiz.questions = req.body.questions;
            req.quiz.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.quiz);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.quiz[p] = req.body[p];
            }

            req.quiz.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.quiz);
                }
            });
        })
        .delete(function(req,res){
            req.quiz.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return quizRouter;
};

module.exports = routes;