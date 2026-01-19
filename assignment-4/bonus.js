let nums = [1,1,1,2,2,2,2];
function majorityElement(nums) {
  let checkedNumber = null;
  let countOfSameNumber = 0;

  nums.map((num) => {
    if (countOfSameNumber === 0) {
      checkedNumber = num;
    }
    countOfSameNumber += num === checkedNumber ? 1 : -1;
  });

  return checkedNumber;
}

console.log(majorityElement(nums));
