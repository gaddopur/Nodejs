module.exports = (x, y, callbacks) => {
    if(x <= 0 || y <= 0) {
        setTimeout(() => callbacks(new Error("The rectangle dimension must be greater then zero"), null), 2000);
    }
    else {
        setTimeout(() => callbacks(null, {
            parameter: () => 2*(x + y),
            area: () => x*y
        }), 2000);
    }
}


// exports.area = (x, y) => x*y;
// exports.parameter = (x, y) => 2*x*y;