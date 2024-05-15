
let flag = false;
let do_work = (time, work) => {
    return new Promise((resolve, reject)=>{
        if(flag){
            setTimeout(()=>{
                resolve(work());
            }, time);
        }
        else{
            reject(()=>{
                console.log("the work is not performed");
            });
        }
    })
}

do_work(2000, ()=>{
    console.log("the order is placed");
})
.then(()=>{
    return do_work(0, ()=>{
        console.log("the production has started");
    })
})
.then(()=>{
    return do_work(1000, ()=>{
        console.log("the fruits are chopped");
    })
})
.then(()=>{
    return do_work(2000, ()=>{
        console.log("the water is poured");
    })
})
.catch(()=>{
    console.log("somethis is wrong the order is not placed");
})
.finally(()=>{
    console.log("the work is finished");
})