let numbers = [1, 2, 3, 4, 5, 6];

function sum(a, b, c, d){
    return a + b + c+ d;
}
let ret = sum(...[2, 3, 4, 5]);

console.log(ret);