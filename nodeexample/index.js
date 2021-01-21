var rect = require('./rectangle')

function solveRect(x, y) {
    console.log("Solving for rectangle l = " + x + " b = " + y);
    
    rect(x, y, (err, rectangle) => {
        if(err) {
            console.log("ERROR:" + err.message);
        }
        else {
            console.log("Area of the of rectangle = " + rectangle.area());
            console.log("Parameter of the rectangle = " + rectangle.parameter());
        }
    });

    console.log("Hey whats going on here");
}

solveRect(2, 3);
solveRect(1, 4);
solveRect(-1, 0);