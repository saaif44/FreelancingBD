
let flag = true;

function time(ms){
    return new Promise((resolve, reject)=>{
        if(flag){
            setTimeout(resolve, ms);
        }
        else{
            reject(console.log("There is an error"));
        }
    })
}


async function works(){
    try{
        await time(1000);
        console.log("the order is placed");
        await time(2000);
        console.log("we have served the customer");
        await time(3000);
        console.log("the customer has finished eating");
        await time(1000);
        console.log("the customer have paid the bill");
        await time(1000);
        console.log("they have left the shop");
    }
    catch(error){
        console.log("The error happed", error );
    }
    finally{
        console.log("that all about today");
    }
}

works();