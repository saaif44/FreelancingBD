function f1(){
    let count=0;
    return function (){
        count++;
        console.log(count);
    };
}

const x = f1();
x();
x();
const y = f1();
y();