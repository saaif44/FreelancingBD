
let greetings={
    morning : "good morning", 
    afternoon : "good afternoon", 
    night : "good night"
}

let greet = (time)=>{
    console.log(greetings[time]);
}

let farewellmessage = "good bye";


module.exports = { greetings, greet, farewellmessage};

console.log(farewellmessage);
