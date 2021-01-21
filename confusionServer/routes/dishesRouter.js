const express = require('express');
const bodyParser = require('body-parser');
const dishes = require('../model/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req, res, next) => {
    dishes.find({})
    .then(dishes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    // res.setHeader('Content-Type', 'application/json');
    res.end("This type of operation is forbidden on /dishes");
})
.post((req, res, next) => {
    dishes.create(req.body)
    .then(dish => {
        console.log("We created dish successfully", dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, err => next(err))
    .catch(err => next(err));
})
.delete((req, res, next) => {
    dishes.remove({})
    .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, err => next(err))
    .catch(err => next(err));
});

dishRouter.route('/:dishId')
.get((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then(dish => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new: true})
    .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("This type of operation is forbidden on /dishes" + req.params.dishId);
})
.delete((req, res, next) => {
    dishes.findByIdAndRemove(req.params.dishId)
    .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, err => next(err))
    .catch(err => next(err));
});

dishRouter.route('/:dishId/comments')
.get((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then(dish => {
        if(dish != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not Found');
            err.status = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then(dish => {
        if(dish != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end("this type of opperation is forbiden on " + req.params.dishId + " /comments");
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not Found');
            err.status = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then(dish => {
        if(dish != null) {
            dish.comments.push(req.body);
            dish.save()
            .then(dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, err => next(err))
            .catch(err => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not Found');
            err.status = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})
.delete((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then(dish => {
        if(dish != null) {
            for (var i = (dish.comments.length -1); i >= 0; i--) {
                if(dish.comments[i] == null)
                    dish.comments.remove(dish.comments[i]);
                else dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not Found');
            err.status = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
});

dishRouter.route('/:dishId/comments/:commentId')
.get((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then(dish => {
        if(dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if(dish == null){
            err = new Error('Dish ' + req.params.dishId + ' not Found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not Found');
            err.status = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then(dish => {
        if(dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.findByIdAndUpdate(req.params.commentId, {$set:
                req.body() 
            },{new: true})
            .then(comment => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, err => next(err))
            .catch(err => next(err));
        }
        else if(dish == null){
            err = new Error('Dish ' + req.params.dishId + ' not Found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not Found');
            err.status = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then(dish => {
        if(dish != null) {
            res.statusCode = 200;
            res.setHeader('Conetent-Type', 'text/html');
            res.end("This type of operation is forbidden on /dishes/: " + req.params.dishId + " /:req.parmas.commentId");
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not Found');
            err.status = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})
.delete((req, res, next) => {
    dishes.findById(req.params.dishId)
    .then(dish => {
        if(dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.remove(req.params.commentId);
            dish.save()
            .then(dish => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, err => next(err))
            .catch(err => next(err));
        }
        else if(dish == null){
            err = new Error('Dish ' + req.params.dishId + ' not Found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not Found');
            err.status = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
});


module.exports = dishRouter;