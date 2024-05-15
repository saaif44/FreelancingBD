let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let newArr = numbers.filter((x)=>{
    if(x % 2 === 0) return ;
});

let newArr2 = numbers.filter((x)=>{
    return true;
})

newArr.forEach((x)=>{
    console.log(x);
});

console.log("");
newArr2.forEach((x)=>{
    console.log(x);
});