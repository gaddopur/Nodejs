const express = require('express');
const bodyParser = require('body-parser');
const leaders = require('../model/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req, res, next) => {
    leaders.find({})
    .then(leaders => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    // res.setHeader('Content-Type', 'application/json');
    res.end("This type of operation is forbidden on /leaders");
})
.post((req, res, next) => {
    leaders.create(req.body)
    .then(leader => {
        console.log("We created leader successfully", leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})
.delete((req, res, next) => {
    leaders.remove({})
    .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, err => next(err))
    .catch(err => next(err));
});

leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    leaders.findById(req.params.leaderId)
    .then(leader => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {new: true})
    .then(leader => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("This type of operation is forbidden on /leaders" + req.params.leaderId);
})
.delete((req, res, next) => {
    leaders.findByIdAndRemove(req.params.leaderId)
    .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = leaderRouter;