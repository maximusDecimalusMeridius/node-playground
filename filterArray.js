var removeElement = function(nums, val) {
    const cleanArray = nums.filter(x => !(x == val));
    console.log(cleanArray);
};


nums = [0,1,2,2,3,0,4,2];
val = 2;
removeElement(nums, val);