const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end("We will return all the promotions for you");
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("This type of operation is forbidden on /promotions");
})
.post((req, res, next) => {
    res.end("We will add the promotions which you give name: " + req.body.name + " and discription: " + req.body.discription);
})
.delete((req, res, next) => {
    res.end("We will delete the given promotions");
});

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res, next) => {
    res.end("We will return the promotions of Id" + req.params.promotionId);
})
.put((req, res, next) => {
    res.end("We will update the promotions which you give name: " + req.body.name + " and discription: " + req.body.discription + " and whose promotionId " + req.params.promotionId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("This type of operation is forbidden on /promotions");
})
.delete((req, res, next) => {
    res.end("Deleting the promotion: " + req.params.promotionId);
});


module.exports = promotionRouter;