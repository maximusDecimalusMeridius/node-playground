//forEach

// [1, 2, 3].forEach((item, index, array) => {
//     console.log("Value: ", item, " at index: ", index);
// })

//filter
let ints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = ints.filter( n => n % 2 === 0).forEach( (n, index) => console.log("Value: ", n, "at Index: ", index));

//some
//returns a true boolean value if any of the values inside the array are true
// ints = [-3, 3, -2, 2, -1, 1, 0];
ints = [0, 1, 2, 3, 4, 5];
const hasNegativeNums = (ints.some( (x, index, array) => x < 0) ? `Array has negative numbers in it.`: `Array does not have negative numbers in it.`)
console.log(hasNegativeNums);

