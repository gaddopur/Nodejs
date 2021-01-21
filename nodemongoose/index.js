const mongoose = require('mongoose');
const dishes = require('./model/dishes');
const Dishes = require('./model/dishes');

const url = 'mongodb://localhost:27017/Confusion';
const connect = mongoose.connect(url);

connect.then(db => {
    console.log("Connected Successfully to the mongodb database");

    Dishes.create({
        name:'Laddus',
        description:'This is made of basen'
    })
    .then(dish => {
        return dishes.findByIdAndUpdate(dish._id, {$set: 
            {description: "This is updated basen so don't worry pls eat"}
        }, {new:true}).exec();
    })
    .then(dish => {
        console.log(dish);
        dish.comments.push({
            rating:4,
            comment:"From where you made this it is very testy",
            author:"Aman Singh"
        });
        return dish.save();
    })
    .then(dish => {
        console.log("Watch all the updated dish", dish);
        return Dishes.remove({});
    })
    .then((res) => {
        console.log(res);
        return mongoose.connection.close();
    })
    .catch(err => console.log("We found an error", err));
})
.catch(err => console.log('We found some what we do next can you give me some hint', err));

