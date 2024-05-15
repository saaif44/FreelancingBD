let arr = [1, 2, 3, 4, 5];

arr.forEach(function(x){
    x *= 2;
    console.log(x);
});


arr.forEach((x)=>{
     x *= 3;
    console.log(x);
});

console.log(arr);