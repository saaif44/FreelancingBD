function work(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let flag = true;
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

async function callme(){
    try{
        console.log("started");
        let data = await work();
        console.log(`got data ${data}`);
    }
    catch(error){
        console.log(`erorr shown : ${error}`);
    }
    finally{
        console.log('finished');
    }
}

callme();