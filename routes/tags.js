var express = require('express');

var routes = function(Tag){
    var tagRouter = express.Router();

    tagRouter.route('/')
        .post(function(req, res){
            var tag = new Tag(req.body);


            tag.save();
            res.status(201).send(tag);

        })
        .get(function(req,res){

            var query = {};

            if(req.query.genre)
            {
                query.genre = req.query.genre;
            }
            Tag.find(query, function(err,tags){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(tags);
            });
        });

    tagRouter.use('/:tagId', function(req,res,next){
        Tag.findById(req.params.tagId, function(err,tag){
            if(err)
                res.status(500).send(err);
            else if(tag)
            {
                req.tag = tag;
                next();
            }
            else
            {
                res.status(404).send('no tag found');
            }
        });
    });
    tagRouter.route('/:tagId')
        .get(function(req,res){

            res.json(req.tag);

        })
        .put(function(req,res){
            req.tag.title = req.body.title;
            req.tag.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.tag);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.tag[p] = req.body[p];
            }

            req.tag.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.tag);
                }
            });
        })
        .delete(function(req,res){
            req.tag.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return tagRouter;
};

module.exports = routes;