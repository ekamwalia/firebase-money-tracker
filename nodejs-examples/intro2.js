// For loops and if conditions are exactly like C++/Java
// the following loop prints all even numbers between 1 and 10
console.log("Printing all even number less than 10")
for(var i = 0; i < 10; i++) {

    // If statements are also exactly like C++/Java
    if(i%2 == 0) {
        console.log(i);
    } 
}

var someNum = '10'

if(someNum == 10) {
    console.log('someNum == 10', true);
}

if(someNum === 10) {
    console.log('someNum === 10', true);
} else {
    console.log('someNum === 10', false);
}