function printSomething(number, callback) {
	console.log("In function print something")
	number = callback(number)
	console.log("Number is", number)
} 

printSomething(2, (number) => {
	return number + 1;
})
