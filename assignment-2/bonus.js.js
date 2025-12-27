var findKthPositive = function (arr, k) {
  let missingCount = 0;
  let current = 1;
  let i = 0;

  while (missingCount < k) {
    if (i < arr.length && arr[i] === current) {
      i++;
    } else {
      missingCount++;
      if (missingCount === k) return current;
    }
    current++;
  }
};

console.log(findKthPositive([2, 3, 4, 7, 11], 5));