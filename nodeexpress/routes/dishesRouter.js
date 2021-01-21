const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end("We will return all the dishes for you");
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("This type of operation is forbidden on /dishes");
})
.post((req, res, next) => {
    res.end("We will add the dishes which you give name: " + req.body.name + " and discription: " + req.body.discription);
})
.delete((req, res, next) => {
    res.end("We will delete the given dishes");
});

dishRouter.route('/:dishId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res, next) => {
    res.end("We will return the dishes of Id" + req.params.dishId);
})
.put((req, res, next) => {
    res.end("We will update the dishes which you give name: " + req.body.name + " and discription: " + req.body.discription + " and whose dishId " + req.params.dishId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("This type of operation is forbidden on /dishes");
})
.delete((req, res, next) => {
    res.end("Deleting the dish: " + req.params.dishId);
});


module.exports = dishRouter;