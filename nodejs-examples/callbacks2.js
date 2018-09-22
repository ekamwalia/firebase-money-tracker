console.log("About to sleep")

function callback(someString) {
    console.log(someString)
}

setTimeout((callback) => {
    console.log("Hello")
    callback("Workd")
}, 2000)

console.log("World")