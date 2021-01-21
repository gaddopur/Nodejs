const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end("We will return all the leaders for you");
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("This type of operation is forbidden on /leaders");
})
.post((req, res, next) => {
    res.end("We will add the leaders which you give name: " + req.body.name + " and discription: " + req.body.discription);
})
.delete((req, res, next) => {
    res.end("We will delete the given leaders");
});

leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res, next) => {
    res.end("We will return the leaders of Id" + req.params.leaderId);
})
.put((req, res, next) => {
    res.end("We will update the leaders which you give name: " + req.body.name + " and discription: " + req.body.discription + " and whose leaderId " + req.params.leaderId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("This type of operation is forbidden on /leaders");
})
.delete((req, res, next) => {
    res.end("Deleting the leader: " + req.params.leaderId);
});

module.exports = leaderRouter;