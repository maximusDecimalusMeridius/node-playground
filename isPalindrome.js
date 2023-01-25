var isPalindrome = (number) => {
    let numString = String(number);
    let isPal;

    for(let i = 0; i < Math.floor(numString.length / 2); i++){

        if(!(numString.charAt(i) == numString.charAt(numString.length - 1 - i))){
            return false;
        } else {
            isPal = true;
        }
    }
    return isPal;
}

let number = 1000021;

console.log(isPalindrome(number));