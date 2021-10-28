class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    fullName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.fullName;
}

let user = new Student("Liger", ".FSD.", "User");
console.log(greeter(user));