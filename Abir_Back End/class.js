class person{
    constructor(name,  age){
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`My name is ${this.name} and age is ${this.age}`);
    }
}


let john = new person("anis", 24);

john.talk();

console.log(Object.keys(john));
console.log(Object.values(john));
console.log(Object.entries(john));
