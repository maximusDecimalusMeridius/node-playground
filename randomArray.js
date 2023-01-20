// Define a range, create an empty array of that size, create the empty validation array
let range = 100;
let numberArray = new Array(range);
let numCheck = [];

// Populate the array with 0 values
for (let i = 0; i < numberArray.length; i++) {
    numberArray[i] = 0;
    numCheck.push(i + 1);    
}

// Doesn't work - array remains a list of ${range} empty items
// numberArray.forEach( (element, index, array) => {
//     array[index] = 0;
// });

// For each slot on the number Array, check the validation array
// While a number hasn't been picked already, assign it a random number and check to see if it exists
// in the validation array.  If it does, switch already picked to true and splice the value from the validation array,
// assigning that value to the current array index.
numberArray.forEach( (slot, index, array) => {
    
    let pickedOne = false;
    
    while (pickedOne === false){
        var num = Math.ceil(Math.random() * range);
        numCheck.forEach((nums, index, array) => {
            if(nums === num){
                pickedOne = true;
                array.splice(index, 1);
            }
        })
    }

    array[index] = num;
})

console.log(numberArray);