let arr = [1 ,2 , 3, 4, 5];

let newArr = arr.map((x)=>{
    if(x % 2 == 0){
        return x;
    }
    else return null;
});



newArr.forEach((x)=>{
    if(x != null)console.log(x);
})