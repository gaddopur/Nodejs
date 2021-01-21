const express = require('express');
const bodyParser = require('body-parser');
const promoes = require('../model/promoes');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req, res, next) => {
    promoes.find({})
    .then(promoes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promoes);
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    // res.setHeader('Content-Type', 'application/json');
    res.end("This type of operation is forbidden on /promoes");
})
.post((req, res, next) => {
    promoes.create(req.body)
    .then(promo => {
        console.log("We created promo successfully", promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, err => next(err))
    .catch(err => next(err));
})
.delete((req, res, next) => {
    promoes.remove({})
    .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, err => next(err))
    .catch(err => next(err));
});

promoRouter.route('/:promoId')
.get((req, res, next) => {
    promoes.findById(req.params.promoId)
    .then(promo => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promo);
    }, err => next(err))
    .catch(err => next(err));
})
.put((req, res, next) => {
    promoes.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {new: true})
    .then(promo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("This type of operation is forbidden on /promoes" + req.params.promoId);
})
.delete((req, res, next) => {
    promoes.findByIdAndRemove(req.params.promoId)
    .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = promoRouter;