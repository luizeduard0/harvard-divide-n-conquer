const fs = require('fs');

function sortAndCount(array) {
  const n = array.length
  if (n <= 1) {
    return [array, 0]
  }

  const half = Math.floor(array.length / 2)
  const leftArray = array.slice(0, half)
  const rightArray = array.slice(half)

  const [leftResult, leftInversions] = sortAndCount(leftArray)
  const [rightResult, rightInversions] = sortAndCount(rightArray)
  const [merged, splitInverisons] = countSplitInv(leftResult, rightResult, n)

  return [merged, leftInversions + rightInversions + splitInverisons]
}

function countSplitInv(leftArray, rightArray, n) {
  const result = []
  const leftSize = leftArray.length
  const rightSize = rightArray.length
  let numOfInversions = 0

  for (let i = 0, j = 0, k = 0; k < n; k++) {
    if(i < leftSize && j < rightSize) {
      if(leftArray[i] < rightArray[j]) {
        result.push(leftArray[i])
        i++
      } else {
        result.push(rightArray[j])
        numOfInversions += leftArray.length - i
        j++
      }
    } else if(i < leftSize && j >= rightSize) {
      result.push(leftArray[i])
      i++
    } else {
      result.push(rightArray[j])
      j++
    }
  }

  return [result, numOfInversions]
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const array = data.split("\r\n").map(n => parseInt(n));
  const [result, numOfInversions] = sortAndCount(array)
  console.log(numOfInversions)
})