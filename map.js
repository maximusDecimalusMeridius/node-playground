let nums = [32, 53, 73, 29, 1, 89, 64];

// map will take one value and do something to the value passed
nums.filter( n => n % 2 === 0).map( n => n * 2).forEach( n => console.log(n));

// reduce will take two values and add them, before moving on to the next value;
// filter the array for even numbers, multiply them by 2, add them together and display the sum
nums.filter( n => n % 2 === 0).map( n => n * 2).reduce((a, b) => a + b).forEach( n => console.log(n));