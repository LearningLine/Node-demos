// arrow functions

// function inc(a) { return a + 1; }
// var inc = function(a) { return a + 1; }
// var inc = a => a + 1;
// console.log(inc(123));

// function Person(name) {
//     this.name = name;
//
//     this.speak = function(otherPeople) {
//         // otherPeople.forEach(function(otherPerson) {
//         //     console.log('Hi, %s! My name is %s.', otherPerson, this.name);
//         // });
//
//         otherPeople.forEach(otherPerson =>
//             console.log('Hi, %s! My name is %s.', otherPerson, this.name)
//         );
//     }
//
//     // this.speak = () => console.log(this.name);
// }
//
// var jason = new Person('Jason');
// jason.speak([ 'Alice', 'Bob' ]);

// classes

class Person {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log('Hi, my name is %s!', this.name);
    }

    static staticMethod() {
        console.log('static');
    }
}

var jason = new Person('Jason');
jason.speak();

class Employee extends Person {
    constructor(name, dept) {
        super(name);

        this.dept = dept;
    }

    speak() {
        super.speak();

        console.log('I work in the %s department.', this.dept);
    }
}

var alice = new Employee('Alice', 'IT');
alice.speak();

// destructuring

var person = {
    firstName: 'Jason',
    lastName: 'Diamond'
};

function formatName1(person) {
    var first = person.firstName;
    var last = person.lastName;

    return first + ' ' + last;
}

function formatName2(person) {
    var { firstName, lastName } = person;

    return firstName + ' ' + lastName;
}

function formatName3(person) {
    var { firstName: first, lastName: last } = person;

    return first + ' ' + last;
}

function formatName4({ firstName: first, lastName: last }) {
    return first + ' ' + last;
}


function formatName({ firstName: first, lastName: last }) {
    // template literals
    return `${first} ${last.toUpperCase()}`;
}

function formatArray([ first, last ]) {
    return first + ' ' + last;
}

console.log(formatName(person));
console.log(formatArray([ 'Alice', 'Smith' ]));

// template literal tags

function myTag(template, values) {
    console.log(arguments);
}

myTag`a number: ${123}, a string: ${"foo"}, a date: ${new Date()}`

//html`<p>${user.name}</p>`

// get`http://aouhsatnoeuhtsoe.com
// Content-Type: asohuasetno
//
// snathusna
// anoteuhans
// aoeuast
// `

// spread and rest operators

// params int[] nums
function sum(...nums) {
    return nums.reduce(function(p, c) {
        return p + c;
    }, 0);
}

console.log(sum(1, 2, 3));

var nums = [ 4, 5, 6 ];

console.log(sum(...nums));

// default argument values

function foo(a = 123, b = 456) {
    // a = a || 123;
    // b = b || 456;
}

// let and const

function bar() {
    // console.log(a);

    if (false) {
        let a = 1;
        const b = 1;
        // b = 2;
    }

    // console.log(a);
}

bar();

var obj = {
    delete: function() {
    }
};




//
