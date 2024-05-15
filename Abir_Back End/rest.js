function sum(...arr){
    let x=0;
    for(let i of arr){
        x += i;
    }
    return x;
}


let ret = sum(1, 2, 3, 4, 5, 6);
console.log(ret);