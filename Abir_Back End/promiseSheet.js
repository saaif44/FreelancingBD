function work(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let flag = false;
            if(flag){
                let data = "Operation is done";
                resolve(data);
            }
            else{
                let data = "error happened";
                reject(data);
            }
        }, 3000);
    });
}

work()
.then((data)=>{
    console.log(data);
})
.catch((data)=>{
    console.log(data);
})
.finally(()=>{
    console.log("finished all work");
})