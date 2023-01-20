let nums = [32, 53, 73, 29, 1, 89, 64];

// filter returns boolean based on the condition based as an argument
console.log(nums.filter( n => n % 2 === 0));

// Checking initial array to show it hasn't been changed
console.log(nums);

// Array methods can be chained
nums.filter( n => n % 2 === 0)
    .forEach( n => {
        console.log(n);
    })

// Or written in one line
nums.filter( n => n % 2 === 0).forEach( n => console.log(n))