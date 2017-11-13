const arr = [5, 1, 2, 0, 3, 4]

function sort (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j > 0 && arr[j - 1] > arr[j]; j--) {
      const temp = arr[j - 1]
      arr[j - 1] = arr[j]
      arr[j] = temp
    }
  }
  return arr
}

console.log(sort(arr))
